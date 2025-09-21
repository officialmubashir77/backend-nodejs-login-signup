const express = require('express');
const morgan = require('morgan')
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

// Logging middleware
app.use(morgan('dev'));

// Custom Middleware for Home route
const HomeMiddleware = (req, res, next) => {
    console.log(`This is a middleware and method is  ${req.method} request for '${req.url}'`);
    next();
}

// Global middleware
// app.use((req, res, next) => {
//     console.log(`This is a middleware and method is  ${req.method} request for '${req.url}'`);
//     next();
// });


app.get('/', HomeMiddleware, (req, res) => {
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
