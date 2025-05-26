const express = require('express');

const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const magicController = require('../controllers/magicController');
const logoutController = require('../controllers/logoutController');

const verifyJWT = require('../middleware/verifyJWT');

const authRouter = express.Router();

authRouter.post('/register', registerController);

authRouter.post('/login', loginController);

authRouter.get('/magic', magicController);

authRouter.get('/logout', verifyJWT, logoutController);

module.exports = authRouter;