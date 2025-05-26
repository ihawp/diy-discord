const { RateLimiterMemory } = require('rate-limiter-flexible');

const smallOptions = {
    points: 6,
    duration: 2
}

const mediumOptions = {
    points: 10,
    duration: 1.5
}

const largeOptions = {
    points: 14,
    duration: 1
}

const smallRateLimiter = new RateLimiterMemory(smallOptions);
const mediumRateLimiter = new RateLimiterMemory(mediumOptions);
const largeRateLimiter = new RateLimiterMemory(largeOptions);

const rateLimit = (rateLimiter) => {
  return async (req, res, next) => {
    try {
      await rateLimiter.consume(req.ip);
      next();
    } catch (err) {
      res.status(429).json({ error: 'Too many requests, slow down.' });
    }
  };
};

module.exports = {
    rateLimit,
    smallRateLimiter,
    mediumRateLimiter,
    largeRateLimiter,
}