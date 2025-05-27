const { selectFrontendUserById } = require('../utils/accountsQueries');

const logger = require('../utils/logger');

const verifyController = async (req, res) => {

    const { id } = req.user;

    try {
        const response = await selectFrontendUserById(id);
        req.user.info = response[0];

        logger.info({
            success: true,
            data: {
                id,
                verified: true,
                action: 'User verified',
                timestamp: new Date(),
            }
        });

    } catch (error) {
        return res.status(500).json({ data: { verified: true }, error: 'Error when fetching user frontend data.' })
    }

    res.status(200).json({ data: { verified: true, user: req.user.info }, error: null });

}

module.exports = verifyController;