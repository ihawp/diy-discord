const validator = require('validator');
const {} = require('../utils/accountsQueries');
const falseData = { emailUpdated: false }

const updateEmailController = (req, res) => {

    const { id } = req.user;
    const { email } = req.body;

    const trimEmail = email.trim();

    if (!id || !trimEmail) {
        return res.status(400).json({ data: falseData, error: 'Missing information' });
    }

    if (!validator.isEmail(trimEmail)) {
        return res.status(400).json({ data: falseData, error: 'A valid email was NOT submitted.' });
    }

    // Check if this is already their email.
    try {

    } catch (error) {
        return res.status().json({ data: falseData, error: 'There was a database error. Please try again later.' });
    }

    // UPDATE THE USER EMAIL

    // IF THEY WANT TO CHANGE THEIR EMAIL THEY HAVE TO CLICK MAGIC LINK FROM EMAIL WHICH TAKES THEM DOWN AUTH ROUTE?

    try {

    } catch (error) {

    }

    // put here as example for return data expected on frontend... will likely be moved to some magic route logic
    res.status(200).json({ data: { emailUpdate: true, newEmail: trimEmail }, error: null });

}

module.exports = updateEmailController;