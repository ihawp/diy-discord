const express = require('express');

// Controllers
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const magicController = require('../controllers/magicController');
const logoutController = require('../controllers/logoutController');
const verifyController = require('../controllers/verifyController');

// Middleware
const verifyJWT = require('../middleware/verifyJWT');
const { rateLimit, smallRateLimiter } = require('../utils/rateLimit');

// Create Router
const authRouter = express.Router();

/**
 * @route POST /register
 * @description Registers a new user
 * @middleware rateLimit (smallRateLimiter)
 * @controller registerController
 */
authRouter.post('/register', 
    rateLimit(smallRateLimiter), 
    registerController
);

/**
 * @route POST /login
 * @description Logs a user into the application
 * @middleware 
 * @controller loginController
 */
authRouter.post('/login', 
    loginController
);

/**
 * @route GET /magic
 * @description Checks parameters (id, key) against DB stored id and key hash (`auth_token`). 
 * @controller magicController
 */
authRouter.get('/magic', 
    magicController
);

/**
 * @route GET /logout
 * @description Log the user out of their application session.
 * @middleware verifyJWT
 * @controller logoutController
 */
authRouter.get('/logout', 
    verifyJWT, 
    logoutController
);

/**
 * @route POST verify
 * @description Front-End link for verifying cookie JWT for content output upon inital load.
 * @middleware verifyJWT
 * @controller verifyController
 */
authRouter.post('/verify', 
    verifyJWT, 
    verifyController
);

module.exports = authRouter;