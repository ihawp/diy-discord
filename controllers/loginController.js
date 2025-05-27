const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const logger = require('../utils/logger');

const { selectUserByUsername, updateUserAuthById } = require('../utils/accountsQueries');
const { generateMagicTokenEmailTemplate } = require('../utils/emailTemplates');
const { sendEmailTemplate } = require('../utils/sendEmail');

/**
 * Verify a users credentials entered 
 * during login before sending a `magic` 
 * verification link to the users email
 * 
 * @param {Request} req
 * @param {Response} res
 * @return {json}
 */
const loginController = async (req, res) => {

    const { username, password } = req.body;

    const trimUsername = username.trim();

    if (!trimUsername || !password) {
        return res.status(400).json({ data: null, error: 'Missing values.' });
    }

    if (trimUsername.length < 5 || trimUsername.length > 16) {
        return res.status(400).json({ data: null, error: 'Username length. Usernames must be between 5 and 16 characters in length.' });
    }

    const userInfo = await selectUserByUsername(trimUsername);

    if (userInfo.length === 0) {
        // Give this error instead of account doesnt exist... may as well let people with bad intentions spend their time on accounts that don't exist!
        return res.status(400).json({ data: null, error: 'Incorrect username or password.' });
    }

    const realUserInfo = userInfo[0];

    const passwordHash = realUserInfo.password;

    if (!passwordHash) {
        return res.status(400).json({ data: null, error: 'Database error when retrieving user account information.' });
    }

    const passwordComparison = await bcrypt.compare(password, passwordHash);

    if (!passwordComparison) {
        return res.status(400).json({ data: null, error: 'Incorrect username or password.' });
    }

    const authToken = crypto.randomBytes(32).toString('hex');
    
    const hashedAuthToken = await bcrypt.hash(authToken, 10);

    try {
        await updateUserAuthById(hashedAuthToken, realUserInfo.id);
    } catch (error) {
        return res.status(400).json({ data: null, error: 'Error inserting authentication token. Please try logging in again.' });
    }

    const emailTemplate = generateMagicTokenEmailTemplate(realUserInfo.email, realUserInfo.id, authToken);

    try {
        await sendEmailTemplate(emailTemplate);
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Error sending verification link. Please request another link.' });
    }

    res.status(200).json({ data: { loggedIn: true }, error: null });

    logger.info({
        loggedIn: true,
        id: realUserInfo.id,

    });

}

module.exports = loginController;