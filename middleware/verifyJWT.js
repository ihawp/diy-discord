const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {

    const { jwt } = await req.signedCookies;
    console.log(jwt);

    console.log('req signed cookies: ', req.signedCookies);

    next();

}

module.exports = verifyJWT;