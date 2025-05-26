const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { insertUserAndAuth, selectUserByUsernameOrEmail } = require('../utils/usePool');

const { generateMagicTokenEmailTemplate } = require('../utils/emailTemplates');
const { sendEmailTemplate } = require('../utils/sendEmail');

const registerController = async (req, res) => {

    const { username, email, password } = req.body;

    const trimUsername = username.trim();
    const trimEmail = email.trim();

    if (!trimUsername || !trimEmail || !password) {
        return res.status(400).json({ data: null, error: 'Empty Values' });
    }

    if (trimUsername.length < 5 || trimUsername.length > 16) {
        return res.status(400).json({ data: null, error: 'Username length. Usernames must be between 5 and 16 characters in length.' });
    }

    if (!validator.isEmail(trimEmail)) {
        return res.status(400).json({ data: null, error: 'Not an email' });
    }

    const usernameOrEmailExists = await selectUserByUsernameOrEmail(trimUsername, trimEmail);

    if (usernameOrEmailExists.length > 0) {
        return res.status(406).json({ data: null, error: 'Username already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const authToken = crypto.randomBytes(32).toString('hex');

    const hashedAuthToken = await bcrypt.hash(authToken, 10);

    const insertUser = {
        insertId: null,
    }

    try {
        const { insertId } = await insertUserAndAuth(trimUsername, trimEmail, passwordHash, hashedAuthToken);
        insertUser.insertId = insertId;
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Error inserting new user. Please try again.' });
    }

    const emailTemplate = generateMagicTokenEmailTemplate(trimEmail, insertUser.insertId, authToken);

    try {
        await sendEmailTemplate(emailTemplate);
    } catch (error) {
        return res.status(500).json({ data: null, error: 'Error sending verification link. Please request another link.' });
    }

    res.status(200).json({ data: { registered: true, }, error: null });

}

module.exports = registerController;