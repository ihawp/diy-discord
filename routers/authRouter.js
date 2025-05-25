const express = require('express');
const registerController = require('../controllers/registerController');

const authRouter = express.Router();

authRouter.get('/register', registerController);

module.exports = authRouter;