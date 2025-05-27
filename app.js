require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('./utils/logger');

// Routers
const authRouter = require('./routers/authRouter');
const teamsRouter = require('./routers/teamsRouter');

const app = express();

app.use(cookieParser('ihawp.com'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
app.use(express.static(path.join(__dirname, 'frontend')));
app.get(/.*/, (req, res) => {
    logger.info(`User Connected: ${req.ip}`);
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

module.exports = app;