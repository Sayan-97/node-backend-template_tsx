import express, { type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import corsOptions from '@/configs/corsOptions';
import rateLimiter from '@/configs/rateLimiter';
import { errorHandler, notFound } from '@/middlewares/errorHandler';
import testRoutes from '@/routes/test.route';

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

app.get('/', (_, res: Response) => {
  res.json({ message: 'Server up and running!' });
});

// ROUTES
app.use('/api/test', testRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
