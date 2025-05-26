const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    maxAge: 3600000,
    signed: true,
}

module.exports = cookieOptions;