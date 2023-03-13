const express = require('express');
const app = express();

// endpoint untuk memberikan list data users
app.get('/users', (req, res) => {
  const users = [
    { name: 'John', id: 1 },
    { name: 'Smith', id: 2 },
    { name: 'Bob', id: 3 }
  ];
  res.json(users);
});

// endpoint untuk memberikan data user sesuai dengan permintaan client
app.get('/users/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const users = [
    { name: 'John', id: 1 },
    { name: 'Smith', id: 2 },
    { name: 'Bob', id: 3 }
  ];
  const user = users.find(u => u.name.toLowerCase() === name);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// middleware untuk menangani error dengan format JSON
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || 'Resource tidak ditemukan';
    res.status(statusCode).json({ error: message });
  });
  
  // middleware untuk menangani routing 404 dengan format JSON
  app.use((req, res, next) => {
    res.status(404).json({ error: 'Terjadi kesalahan pada server' });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
