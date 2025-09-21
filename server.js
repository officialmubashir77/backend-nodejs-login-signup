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

// Handle form submissionz
app.get('/', (req, res) => {
    res.render('index');
});

// Register route
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Create a new user instance
    const newUser = new userModel({
        username,
        email,
        password
    });

    try {
        await newUser.save();
        res.send(`User ${username} registered successfully!`);
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
    }

});

// API to get all users
app.get('/get-users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.send(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// get user by id
app.get('/get-user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// update user
app.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const user = await userModel.findByIdAndUpdate(id, { username, email, password }, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// delete user
app.delete('/delete-user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
