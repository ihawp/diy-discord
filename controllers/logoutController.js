const logoutController = (req, res) => {

    console.log(req.user);

    res.clearCookie('jwt', { path: '/' });
    res.clearCookie('long-jwt', { path: '/' });

    res.status(200).json({ data: { loggedOut: true }, error: null });

}

module.exports = logoutController;