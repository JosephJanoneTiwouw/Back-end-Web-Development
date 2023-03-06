const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const members = require('./members');
const users = require('./users');

app.get('/', (req, res) => {
  res.status(200).send('This is the home page');
});

app.get('/about', (req, res) => {
  const response = {
    status: 'success',
    message: 'response success',
    description: 'Exercise #03',
    date: new Date().toISOString(),
    data: members,
  };
  res.status(200).json(response);
});

app.get('/users', (req, res) => {
  res.status(200).json(users);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});