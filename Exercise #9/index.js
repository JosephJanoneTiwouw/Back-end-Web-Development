const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// Replace the database URL with your own
const url = 'mongodb://localhost:27017/myapp';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;

  console.log('Connected to MongoDB');

  const db = client.db('myapp');

  app.get('/', (req, res) => {
    db.collection('users').find().toArray((err, result) => {
      if (err) throw err;
      
      res.json(result);
    });
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
});
