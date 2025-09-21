const express = require('express');
const morgan = require('morgan');
const userModel = require('./models/user.model.js');
const path = require('path');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const connectDB = require('./config/db.js');

// Connect to the database
connectDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


app.post('/get-form-data', (req, res) => {
    const { username, email, password } = req.body;
    

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
