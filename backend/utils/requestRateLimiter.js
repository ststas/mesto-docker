const rateLimit = require('express-rate-limit');

const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
});

module.exports = { requestRateLimiter };
