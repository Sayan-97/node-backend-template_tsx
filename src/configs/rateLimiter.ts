import rateLimit from 'express-rate-limit';

const rateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 min
  max: 40,
  standardHeaders: true,
  legacyHeaders: false,
});

export default rateLimiter;
