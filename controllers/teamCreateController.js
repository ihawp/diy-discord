const { insertTeam } = require('../utils/teamsQueries');
const validator = require('validator');

/**
 * Create a user team in the `teams` table
 * 
 * @param {Request} req 
 * @param {Response} res
 * @return {Object} 
 */
const teamCreateController = async (req, res) => {

    const { name, description, private } = req.body;
    const { id } = req.user;

    const trimName = name.trim();
    const trimDescription = description.trim();
    const trimPrivate = private.trim();

    if (!trimName || !trimDescription || !trimPrivate) {
        return res.status(400).json({ data: { teamCreated: false }, error: 'Missing information.' })
    }

    if (!validator.isLength(trimName, { max: 255 }) || !validator.isLength(trimDescription, { max: 255 }) || !validator.isLength(trimPrivate, { min: 1, max: 1 })) {
        return res.status(400).json({ data: { teamCreated: false }, error: 'Incorrect information.' });
    }

    // id: owner_id

    try {
        await insertTeam(name, description, id, private);
    } catch (error) {
        return res.status(500).json({ data: { teamCreated: false }, error: 'There was a database error and the team could not be inserted.' });
    }

    res.status(200).json({ data: { teamCreated: true }, error: null });

}

module.exports = teamCreateController;