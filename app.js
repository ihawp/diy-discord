require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const authRouter = require('./routers/authRouter');

const app = express();

app.use(cookieParser('ihawp.com'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/*

    Auth Route

    Purpose: Authentication

    Sub-Routes: /register, /login

*/

app.use('/auth', authRouter);

/*

    Serve the Front-End application

*/

app.use(express.static(path.join(__dirname, 'frontend')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Export to: ./server.js
module.exports = app;