const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const jwt = await req.cookies?.jwt;

    console.log(jwt);

    next();

}

module.exports = verifyJWT;