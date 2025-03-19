require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/admin/auth');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// Database Connection
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session Setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000 } // 10 minutes
}));

// EJS Setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

// Routes
app.use('/', authRoutes);

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
