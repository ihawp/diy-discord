const cookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    maxAge: 3600000,
    partitioned: true,
    signed: true,
}

module.exports = cookieOptions;