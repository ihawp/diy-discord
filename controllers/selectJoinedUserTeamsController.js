const { selectJoinedUserTeamsById } = require('../utils/teamsQueries');

const selectJoinedUserTeamsController = async (req, res) => {

    const { id } = req.user;

    try {
        const response = await selectJoinedUserTeamsById(id);

        if (response.length === 0) {
            return res.status(400).json({ data: null, error: 'Could not find any teams.' });
        }

        // escape with data
        req.user.info = response;
    } catch (error) {
        return res.status(400).json({ data: null, error: 'Could not find any teams.' });
    }

    res.status(200).json({ data: req.user.info, error: null });

}

module.exports = selectJoinedUserTeamsController;