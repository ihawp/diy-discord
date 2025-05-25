const express = require('express');
const authRouter = require('./routers/authRouter');

const app = express();

/*

    Auth Route

    Purpose: Authentication

    Sub-Routes: /login

*/

app.use('/auth', authRouter);

/*



*/


// Export to: ./server.js
module.exports = app;