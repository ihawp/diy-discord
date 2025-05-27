const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { selectAuthById, updateUserAuthById } = require('../utils/accountsQueries');
const { jwtOptions1h, jwtOptions1w } = require('../utils/jwtOptions');
const { cookieOptions1h, cookieOptions1w } = require('../utils/cookieOptions');

const magicController = async (req, res) => {

    const { id, key } = req.query;

    if (!validator.isNumeric(id)) {
        return res.status(400).json({ data: null, error: 'Improper ID format.' });
    }

    if (!validator.isLength(key, { min: 64, max: 64 })) {
        return res.status(400).json({ data: null, error: 'Improper Key format.' });
    }

    const authToken = {
        token: null,
    }

    try {
        const getAuthToken = await selectAuthById(id);
        authToken.token = getAuthToken[0]?.auth_token;
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failed to retrieve authentication token from the database.' });
    }

    const compareToken = await bcrypt.compare(key, authToken.token);

    if (!compareToken) {
        return res.status(400).json({ data: null, error: 'Failure.' });
    }

    try {
        await updateUserAuthById('', id);
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Failure updating authentication token. Please try clicking the link again.' });
    }

    // Create JWT tokens
    //
    const createJWT = jwt.sign({ id }, process.env.JWT_SECRET, jwtOptions1h);
    const createLongLastingJWT = jwt.sign({ id }, process.env.LONG_JWT_SECRET, jwtOptions1w);

    res.cookie('jwt', createJWT, cookieOptions1h);
    res.cookie('long-jwt', createLongLastingJWT, cookieOptions1w);

    res.status(200).json({ data: { authenticated: true }, error: null });

}

module.exports = magicController;