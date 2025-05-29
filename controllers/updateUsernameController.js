const { updateUserUsernameById } = require('../utils/accountsQueries');
const validator = require('validator');

const updateUsernameController = async (req, res) => {

    const { id } = req.user;
    const { username } = req.body;

    if (!id || !username) {
        return res.status(400).json({ data: { usernameUpdated: false }, error: 'Missing information.' })
    }

    if (!validator.isLength(username, { min: 5, max: 16 })) {
        return res.status(400).json({ data: {}, error: 'Submitted username is the incorrect length. Usernames should be between 5 and 16 characters.' })
    }

    try {
        await updateUserUsernameById(username, id);
    } catch (error) {
        return res.status(500).json({ data: {}, error: 'There was a problem when updating your username. Please try again.' })
    }

    res.status(200).json({ data: { usernameUpdated: true }, error: null });

}

module.exports = updateUsernameController;