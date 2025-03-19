require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDB = require("./src/config/db");
const authRoutes = require('./src/routes/admin/auth');


const app = express();

// Database Connection
connectDB();

// EJS Setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret', // Use env variable
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 10000 } // 10 minutes
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', authRoutes);
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    next();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

