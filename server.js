const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('This is the home page');
});

app.get('/about', (req, res) => {
  res.send('This is the about page');
});

app.get('/contact', (req, res) => {
  res.send('This is the contact page');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
