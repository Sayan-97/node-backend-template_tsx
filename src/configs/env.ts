import dotenv from 'dotenv';

dotenv.config();

const env = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  WHITELISTED_DOMAINS: ['http://localhost:3000'],
};

export default env;
