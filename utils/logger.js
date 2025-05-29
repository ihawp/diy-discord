const path = require('path');
const winston = require('winston');

const logDir = path.join(__dirname, '..', 'logs');

// Create the logger

const logger = winston.createLogger({
  level: process.env.LOGGER_LEVEL || 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'silly.log'), level: 'silly' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

// Create some functions for logging

/**
 * Create an INFO level log with `winston`
 * 
 * @param {Object} filledTemplate - An info template of what 
 */
const createLoggerInfo = (filledTemplate) => {
    logger.info(filledTemplate);
}


/**
 * Create an INFO level template
 * 
 * @param {Boolean} success - Can be undefined to represent something not having happened yet
 * @param {Number} id - User ID
 * @param {Boolean} verified - Has the users JWT token been verified at this point in the route
 * @param {String} action - Description of the action taken by the user
 * @returns {Object}
 */
const infoTemplate = (success, id, verified, action) => {
  return {
      success,
      data: {
          id,
          verified,
          action,
          timestamp: new Date(),
      }
  }
}

module.exports = logger, {
  createLoggerInfo,
};