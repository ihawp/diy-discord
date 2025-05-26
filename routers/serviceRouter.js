const express = require('express');

// Controllers

// Middleware
const verifyJWT = require('../middleware/verifyJWT');
const { rateLimit, smallRateLimiter } = require('../utils/rateLimit');

// Create Router
const serviceRouter = express.Router();

/**
 * @route GET /example
 * @description Example description
 * @middleware 
 * @controller
 */

module.exports = serviceRouter;