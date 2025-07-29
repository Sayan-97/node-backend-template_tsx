import mongoose, { Schema, Document, Model, type ObjectId } from 'mongoose';

export type User = Document & {
  _id: ObjectId;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSchema: Schema<User> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User: Model<User> = mongoose.model<User>('User', userSchema);
