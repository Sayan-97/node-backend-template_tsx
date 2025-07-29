import mongoose from 'mongoose';
import env from './env';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.DB_URI as string);
    console.log('Database connected!');
  } catch (error) {
    console.error('Database connection failed! Error:', error);
    process.exit(1);
  }
};
