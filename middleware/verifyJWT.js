const jwt = require('jsonwebtoken');
const { asyncVerifyJWT } = require('../utils/asyncJWT');

const verifyJWT = async (req, res, next) => {

    const authToken = req.signedCookies['jwt'] || '';

    if (!authToken) {
        return res.status(403).json({ data: null, error: 'No authentication token present.' });
    }

    try {
        const verifyToken = await asyncVerifyJWT(authToken);

        console.log(verifyToken);
    } catch (error) {
        return res.status(400).json({ data: null, error: '' });
    }

    next();

}

module.exports = verifyJWT;