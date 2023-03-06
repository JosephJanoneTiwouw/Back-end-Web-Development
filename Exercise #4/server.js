const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const members = [
  {
    id: 1,
    nim: '105022010047',
    name: 'Joseph Janone Tiwouw',
    phone: '+6282260331473',
  },
];

app.get('/members', (req, res) => {
  res.status(200).json(members);
});

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
