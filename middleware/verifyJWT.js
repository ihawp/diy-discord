const logger = require('../utils/logger');
const { asyncVerifyJWT } = require('../utils/asyncJWT');
const validator = require('validator');

const verifyJWT = async (req, res, next) => {

    // Try short jwt token

    const authToken = req.signedCookies['jwt'] || '';

    if (!authToken || !validator.isJWT(authToken)) {
        return res.status(403).json({ data: { loggedOut: false }, error: 'No authentication token present.' });
    }

    try {

        const verifyToken = await asyncVerifyJWT(authToken, process.env.JWT_SECRET);
        req.user = verifyToken;
        return next();

    } catch (error) {

        logger.error({
            success: false,
            data: {
                id: 'unknown',
                action: 'Short JWT Failed',
                timestamp: new Date(),
            }
        });

    }

    // Try Long JWT Token

    const longAuthToken = req.signedCookies['long-jwt'] || '';

    if (!longAuthToken || !validator.isJWT(longAuthToken)) {
        return res.status(400).json({ data: { loggedIn: false }, error: 'Unable to verify your token session, please log in before trying to access services.' });
    }

    try {

        const verifyToken = await asyncVerifyJWT(longAuthToken, process.env.LONG_JWT_SECRET);
        req.user = verifyToken;
        return next();

    } catch (error) {

        logger.error({
            success: false,
            data: {
                id: 'unknown',
                action: 'Long JWT Failed',
                timestamp: new Date(),
            }
        });

        return res.status(400).json({ data: { loggedOut: false }, error: 'Authentication token is invalid.' });
    
    }
};

module.exports = verifyJWT;
