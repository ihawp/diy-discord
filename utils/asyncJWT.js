const jwt = require('jsonwebtoken');

/**
 * Asynchronously verifies a JWT using the secret stored in environment variables.
 * 
 * @async
 * @function asyncVerifyJWT
 * @param {string} authToken - The JWT token to verify.
 * @returns {Promise<Object>} Resolves with the decoded JWT payload if valid.
 * @throws {Error} If the token is invalid or verification fails.
 * 
 * @example
 * try {
 *   const payload = await asyncVerifyJWT(token);
 *   console.log(payload); // decoded token payload
 * } catch (err) {
 *   console.error('Invalid token:', err);
 * }
 */
const asyncVerifyJWT = async (authToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(authToken, process.env.JWT_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
}

module.exports = { 
  asyncVerifyJWT,
}