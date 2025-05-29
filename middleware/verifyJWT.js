const logger = require('../utils/logger');
const { asyncVerifyJWT } = require('../utils/asyncJWT');
const validator = require('validator');

const verifyJWT = async (req, res, next) => {
  const shortToken = req.signedCookies['jwt'] || '';
  const longToken = req.signedCookies['long-jwt'] || '';

  // Utility function to log token failure
  const logError = (action) => {
    logger.error({
      success: false,
      data: {
        id: 'unknown',
        action,
        timestamp: new Date(),
      },
    });
  };

  // Try verifying short token first
  if (shortToken && validator.isJWT(shortToken)) {
    try {
      const verified = await asyncVerifyJWT(shortToken, process.env.JWT_SECRET);
      req.user = verified;
      return next();
    } catch (err) {
      logError('Short JWT Failed');
      // Fall through to try long token
    }
  }

  // If short token is invalid or not present, try long token
  if (!longToken || !validator.isJWT(longToken)) {
    return res.status(403).json({
      data: { loggedIn: false },
      error: 'No valid authentication token present.',
    });
  }

  try {
    const verified = await asyncVerifyJWT(longToken, process.env.LONG_JWT_SECRET);
    req.user = verified;
    return next();
  } catch (err) {
    logError('Long JWT Failed');
    return res.status(403).json({
      data: { loggedOut: false },
      error: 'Authentication token is invalid. Please log in again.',
    });
  }
};

module.exports = verifyJWT;