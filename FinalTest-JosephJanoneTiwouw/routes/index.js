const express = require("express");
const moment = require("moment");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
const client = require("./mongodb");

require("./mongoose");
const Users = require("./User");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware untuk penangan Log
const log = (req, res, next) => {
  console.log(`${moment().format("LLLL")} - ${req.ip} - ${req.originalUrl}`);
  next();
};
app.use(log);
app.use(morgan("combined"));

//Mongoose
app.get("/users", async (req, res) => {
  const users = await Users.find();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);
  res.json(user);
});

app.post("/users", async (req, res) => {
  await Users.create(req.body);
  res.json({
    status: "success",
    message: "data berhasil disimpan",
  });
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  await Users.updateOne({ _id: id }, { name: req.body.name });
  res.json({
    status: "success",
    message: "data berhasil diubah",
  });
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  await Users.deleteOne({ _id: id });
  res.json({
    status: "success",
    message: "data berhasil dihapus",
  });
});

// Import dependencies
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// Import Mongoose model
const Matakuliah = require('../models/Matakuliah');

// GET /matakuliah - Tampilkan semua matakuliah
router.get('/matakuliah', async (req, res) => {
  try {
    const matakuliahs = await Matakuliah.find();
    res.status(200).json({ 
      status: 'success',
      message: 'Data matakuliah berhasil ditemukan',
      data: matakuliahs 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message,
      data: [] 
    });
  }
});

// GET /matakuliah/:kode - Tampilkan matakuliah berdasarkan kode matakuliah
router.get('/matakuliah/:kode', async (req, res) => {
  try {
    const kode = req.params.kode;
    const matakuliah = await Matakuliah.findOne({ kode: kode });
    if (!matakuliah) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Matakuliah tidak ditemukan',
        data: [] 
      });
    }
    res.status(200).json({ 
      status: 'success',
      message: 'Data matakuliah berhasil ditemukan',
      data: [matakuliah] 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message,
      data: [] 
    });
  }
});

// GET /matakuliah?nama= - Tampilkan matakuliah berdasarkan query nama
router.get('/matakuliah', async (req, res) => {
  try {
    const nama = req.query.nama;
    const matakuliahs = await Matakuliah.find({ nama: { $regex: nama, $options: 'i' } });
    res.status(200).json({ 
      status: 'success',
      message: 'Data matakuliah berhasil ditemukan',
      data: matakuliahs 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message,
      data: [] 
    });
  }
});

// POST /matakuliah - Tambahkan matakuliah baru
router.post('/matakuliah', [
  check('kode', 'Kode matakuliah harus diisi').notEmpty(),
  check('nama', 'Nama matakuliah harus diisi').notEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        status: 'fail',
        message: errors.array(),
        data: [] 
      });
    }
    const matakuliah = new Matakuliah(req.body);
    await matakuliah.save();
    res.status(201).json({ 
      status: 'success',
      message: 'Matakuliah berhasil ditambahkan',
      data: [matakuliah] 
    });
  } catch (err) {
    res.status(500).json({ 
      status: 'error',
      message: err.message,
      data: [] 
    });
 

//Middleware untuk 404
app.use((req, res, next) => {
  res.json({
    status: "error",
    kode: "404",
    message: "resource tidak ditemukan",
  });
});

//Middleware untuk error handling
app.use((err, req, res, next) => {
  res.json({
    status: "error",
    message: `terjadi kesalahan pada server: ${err}`,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  });

  const mongoose = require('mongoose');

const matakuliahSchema = new mongoose.Schema({
  kodeMatakuliah: {
    type: String,
    required: true
  },
  nama: {
    type: String,
    required: true
  },
  ruangan: {
    type: String
  },
  jam: {
    type: String
  }
});

