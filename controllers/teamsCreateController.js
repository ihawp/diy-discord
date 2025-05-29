const { insertTeam, insertTeamMember } = require('../utils/teamsQueries');
const validator = require('validator');

/**
 * Create a team row in the `teams` table
 * 
 * @param {Request} req 
 * @param {Response} res
 * @return {Object} 
 */
const teamsCreateController = async (req, res) => {

    const { name, description, private } = req.body;
    const { id } = req.user;

    const trimName = name.trim();
    const trimDescription = description.trim();

    const getPrivate = private?.on ? 1 : 0; 

    if (!trimName || !trimDescription) {
        return res.status(400).json({ data: { teamCreated: false }, error: 'Missing information.' })
    }

    if (!validator.isLength(trimName, { max: 255 }) || !validator.isLength(trimDescription, { max: 255 })) {
        return res.status(400).json({ data: { teamCreated: false }, error: 'Incorrect information.' });
    }

    try {
        const response = await insertTeam(name, description, id, getPrivate);

        if (response) {
            const { insertId } = response;

            await insertTeamMember(insertId, id);

            res.status(200).json({ data: { teamCreated: true, teamExtra: response }, error: null });
        }
    } catch (error) {
        return res.status(500).json({ data: { teamCreated: false }, error: 'There was a database error and the team could not be inserted.' });
    }

}

module.exports = teamsCreateController;