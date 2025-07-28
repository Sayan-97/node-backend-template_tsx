import type { CorsOptions } from 'cors';
import env from './env';

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      env.NODE_ENV === 'development' ||
      !origin ||
      env.WHITELISTED_DOMAINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(new Error(`CORS Error: ${origin} is not allowed.`), false);
      console.log(`CORS Error: ${origin} is not allowed.`);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export default corsOptions;
