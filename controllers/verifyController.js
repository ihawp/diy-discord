const verifyController = (req, res) => {

    res.status(200).json({ data: { verified: true }, error: null });

}

module.exports = verifyController;