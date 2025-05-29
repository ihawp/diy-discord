const { updateUserUsernameById, selectUserIdByUsername } = require('../utils/accountsQueries');
const validator = require('validator');

const falseData = { usernameUpdated: false };

const updateUsernameController = async (req, res) => {

    const { id } = req.user;
    const { username } = req.body;

    const trimUsername = username.trim();

    if (!id || !trimUsername) {
        return res.status(400).json({ data: falseData, error: 'Missing information.' })
    }

    if (!validator.isLength(trimUsername, { min: 5, max: 16 })) {
        return res.status(400).json({ data: falseData, error: 'Submitted username is the incorrect length. Usernames should be between 5 and 16 characters.' })
    }


    try {
        const response = await selectUserIdByUsername(trimUsername);
        if (response.length > 0) {
            return res.status(400).json({ data: falseData, error: `Account with username ${trimUsername} already exists.`});
        }
    } catch (error) {
        return res.status(500).json({ data: falseData, error: 'There was a problem when checking if your new username was available. Please try again.' });
    }


    try {
        await updateUserUsernameById(trimUsername, id);
    } catch (error) {
        return res.status(500).json({ data: falseData, error: 'There was a problem when updating your username. Please try again.' })
    }

    res.status(200).json({ data: { usernameUpdated: true, newUsername: trimUsername }, error: null });

}

module.exports = updateUsernameController;