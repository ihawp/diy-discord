const { deleteUserById } = require('../utils/usePool');

const deleteController = async (req, res) => {

    try {
        await deleteUserById(req.user.id);
    } catch (error) {
        res.status(500).json({ data: { accountDelete: false }, error: 'Unable to delete user account.' })
    }

    res.clearCookie('jwt', { path: '/' });
    res.clearCookie('long-jwt', { path: '/' });

    res.status(200).json({ data: { accountDeleted: true, error: null }});

}

module.exports = deleteController;