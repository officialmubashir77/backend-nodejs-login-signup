const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Global middleware
app.use((req, res, next) => {
    console.log(`This is a middleware and method is  ${req.method} request for '${req.url}'`);
    next();
});

app.get('/', (req, res) => {
    // res.send('This is the home page');
    res.render('index', { title: 'Home Page', message: 'Welcome to the Home Page!' });
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
