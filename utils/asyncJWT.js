const jwt = require('jsonwebtoken');

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