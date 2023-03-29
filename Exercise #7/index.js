const express = require('express');
const cors = require('cors');               // middleware client-server
const morgan = require("morgan");           // log
const multer = require("multer");           // file upload
const fs = require("fs");                   // mengubah nama file yg di upload

const upload = multer({ dest: "public" });
const path = require('path');               // mengakses path directory
const users = require('./users');           // import users.js
const app = express();
const port = 3000;

// Middleware
app.use(express.json());                    // body-parser
app.use(morgan("tiny"));                    // file upload format "tiny"
app.use(express.static('public'));          // file static
// app.use(
//     cors({
//         origin:"http://localhost:3000",
//         // methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         // credentials: true
//     })
// )
// app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// Endpoint home
app.get("/", (req, res) =>{
    // res.send(`Welcome to Helsinki Group Exercise #7`);
    res.sendFile(__dirname + 'index.html');
});

app.get('/download', function(req, res) {
    const file = __dirname + '/public/user1.jpg';
    res.download(file);
});

// Endpoint untuk memberikan list data users
app.get("/users", (req, res) => {
    res.json(users);
});

// Endpoint untuk memberikan data user sesuai dengan permintaan client
app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find((u) => u.name.toLowerCase() === name);

    if (!user) {
        return res.status(404).json({
        message: "Data user tidak ditemukan"
        });
    }

    return res.send(user);
});

// Endpoint untuk menambahkan data user
app.post("/users", (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) {
        return res.status(400).json({ message: 'Masukkan data yang ingin diubah' });
    } else {
        const newUser = { id, name };
        users.push(newUser);
        res.status(201).json({
            message: `Berhasil menambahkan user dengan nama ${name} dan id ${id}`,
            data: newUser,
          });
    }
    
});

app.get("/upload", (req, res) => {
    res.send("Hasil upload");
})

// Endpoint mengupload single file
app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (file){
        // membuat target penyimpanan file di forlder bernama "public"
        const target = path.join(__dirname, "public", file.originalname);
        fs.renameSync(file.path, target); // mengubah nama file kembali ke nama aslinya
        res.send("file berhasil diupload");
    } else{
        res.send("file gagal diupload");
    }
});

// Endpoint update data user
app.put('/users/:name', (req, res) => {
    const { name } = req.params;
    const { id } = req.body;
  
    const userIndex = users.findIndex(user => user.name === name);
  
    if (userIndex === -1) {
      return res.status(404).json({ error: 'Data tidak ditemukan' });
    }
  
    if (!id) {
      return res.status(400).json({ error: 'Data tidak lengkap atau tidak valid' });
    }
  
    const updatedUser = { id, name};
    users[userIndex] = updatedUser;
  
    return res.json({ message: `Data user ${name} berhasil diupdate`, data: updatedUser });
    // buat tidak case sensitive
});

// endpoint menghapus data user
app.delete('/users/:name', (req, res) => {
  const { name } = req.params;

  const userIndex = users.findIndex(user => user.name === name);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'Data tidak ditemukan' });
  }

  users.splice(userIndex, 1);

  return res.json({ message: `Data user ${name} berhasil dihapus` });
});

// Penanganan routing 404
app.use((req, res, next) => {
    res.status(404).json({
      status: "error",
      message: "resource tidak ditemukan",
    });
});

// Penanganan error
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: "terjadi kesalahan pada server",
    });
});

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});