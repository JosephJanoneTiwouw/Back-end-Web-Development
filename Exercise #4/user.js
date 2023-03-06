const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const axios = require('axios');

const getUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

app.get('/users', async (req, res) => {
  const users = await getUsers();
  res.status(200).json(users);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
