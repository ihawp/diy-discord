const { updateUserPasswordById } = require('../utils/accountsQueries');
const { createLoggerInfo, infoTemplate } = require('../utils/logger');

const updatePasswordController = async (req, res) => {

    const { id } = req.user;
    const { password } = req.body;

    // Logging
    createLoggerInfo(infoTemplate(undefined, id, true, `Password update attempt for account ID: ${id} from ${req.ip}`));

    if (!id || !password) {
        return res.status(400).json({ data: { passwordUpdated: false }, error: 'Missing information.' });
    }

    try {
        await updateUserPasswordById(password, id);
    } catch (error) {
        return res.status(500).json({ data: { passwordUpdated: false }, error: 'There was a problem when trying to update your password. Please try again later.' });
    }

    createLoggerInfo(infoTemplate(true, id, true, `Password was updated for user account ID: ${id} from ${req.ip}`));
    res.status(200).json({ data: { passwordUpdated: true }, error: null });

}

module.exports = updatePasswordController;