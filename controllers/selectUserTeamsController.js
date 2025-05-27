const { selectUserTeamsById } = require('../utils/teamsQueries');

const selectUserTeamsController = async (req, res) => {

    const { id } = req.user;

    try {
        const response = await selectUserTeamsById(id);
        
        if (response.length > 0) {
            return res.status(200).json({ data: response, error: null });
        }

    } catch (error) { 
        return res.status(500).json({ data: null, error: 'Unable to retrieve user teams from the database.' });
    }

}

module.exports = selectUserTeamsController;