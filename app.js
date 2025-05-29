require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');

// Routers
const authRouter = require('./routers/authRouter');
const teamsRouter = require('./routers/teamsRouter');

const app = express();

app.use(cookieParser('ihawp.com'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

/**
 * @route USE /auth
 * @description Authentication route (login, register, magic...). Sub-routes are used to alter user-sesion status.
 * @router authRouter
 */
app.use('/auth', authRouter);


/**
 * @route USE /teams
 * @description Teams related route, mainly used for database operations of `teams` table
 * @router teamsRouter
 */
app.use('/teams', teamsRouter);

// Serve Front-End
app.use(express.static(path.join(__dirname, 'react-frontend', 'dist')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'react-frontend', 'dist', 'index.html'));
});

module.exports = app;