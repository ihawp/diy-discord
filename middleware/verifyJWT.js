const jwt = require('jsonwebtoken');
const { asyncVerifyJWT } = require('../utils/asyncJWT');

const verifyJWT = async (req, res, next) => {

    const authToken = req.signedCookies['jwt'] || '';

    if (!authToken) {
        return res.status(403).json({ data: { loggedOut: false }, error: 'No authentication token present.' });
    }

    try {
        const verifyToken = await asyncVerifyJWT(authToken);
        req.user = verifyToken;
    } catch (error) {
        return res.status(400).json({ data: { loggedOut: false }, error: 'Authentication token is invalid.' });
    }

    next();

}

module.exports = verifyJWT;