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

// Do Logging

/**
 * Create an INFO level log with `winston`
 * 
 * @param {Object} filledTemplate - A filled info template of what will be logged (at scale it would be expected that certain templates are used for X and Y because scripts that print that data might break or be annoyed with things that shouldnt exist or that are missing..?)
 */
const createLoggerInfo = (filledTemplate) => {
    logger.info(filledTemplate);
}

// Logging Templates

/**
 * Create an INFO level template
 * 
 * @param {Boolean} success - Can be undefined to represent something not having happened yet
 * @param {Number || undefined} id - User ID, can be undefined in cases where user is not logged in and therefore has no Id
 * @param {Boolean} verified - Has the users JWT token been verified at this point in the route
 * @param {String} action - Description of the action taken by the user
 * @returns {Object}
 * 
 * @example
 * // Pass the created info template directly into the winston log creator
 * createLoggerInfo(
 *    infoTemplate(
 *        true, 
 *        req.user.id, 
 *        true, 
 *        `User is attempting to update the password of account ID: 123 from IP: ${req.ip}`
 *    )
 * );
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
  infoTemplate,
};