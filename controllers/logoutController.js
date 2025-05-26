const logoutController = (req, res) => {

    // res.clearCookie('jwt', { path: '/' });

    res.status(200).json({ data: { loggedOut: true }, error: null });

}

module.exports = logoutController;