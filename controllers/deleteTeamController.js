const validator = require('validator');
const { deleteTeamById } = require('../utils/teamsQueries');

/**
 * Delete a user team
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns {Object<JSON>} - Object containing data / error key/value pairs
 */

const deleteTeamController = async (req, res) => {

    const { id } = req.user;
    const { teamId } = req.body;

    if (!id || !teamId) {
        return res.status(400).json({ data: { teamDeleted: false }, error: 'Missing information.' });
    }

    if (!validator.isInt(teamId)) {
        return res.status(400).json({ data: { teamDeleted: false }, error: 'Team ID submitted was not a number.' })
    }

    try {
        await deleteTeamById(teamId, id);
    } catch (error) {
        return res.status(500).json({ data: { teamDeleted: false }, error: 'There was an error when trying to delete the suggested team. If you are not the owner you will not be able to delete the team, sorry. Lol.' });
    }

    res.status(200).json({ data: { teamDeleted: true }, error: null });

}

module.exports = deleteTeamController;