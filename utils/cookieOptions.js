
/**
 * Set options for cookies set on this server
 * 
 * @example
 * res.cookie('name', data, cookieOptions);
 */

const cookieOptions1h = {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    maxAge: 3600000,
    signed: true,
}

const cookieOptions1w = {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
}

module.exports = {
    cookieOptions1h,
    cookieOptions1w,
};