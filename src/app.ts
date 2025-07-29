import express, { type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import corsOptions from '@/configs/corsOptions';
import rateLimiter from '@/configs/rateLimiter';
import { connectDB } from '@/configs/db';
import { errorHandler, notFound } from '@/middlewares/errorHandler';

import testRoutes from '@/routes/test.route';
import authRoutes from '@/routes/auth.route';
import userRoutes from '@/routes/user.route';

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use(rateLimiter);
app.use(compression());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  }),
);

connectDB();

app.get('/', (_, res: Response) => {
  res.json({ message: 'Server up and running!' });
});

// ROUTES
app.use('/api/test', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
