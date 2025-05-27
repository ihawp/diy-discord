const { selectFrontendUserById } = require('../utils/accountsQueries');

const verifyController = async (req, res) => {

    const { id } = req.user;

    try {
        const response = await selectFrontendUserById(id);
        res.status(200).json({ data: { verified: true, user: response[0] }, error: null });
    } catch (error) {
        res.status(500).json({ data: { verified: true }, error: 'Error when fetching user frontend data.' })
    }

}

module.exports = verifyController;