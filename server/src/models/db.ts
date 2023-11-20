import mongoose, { Schema, model, connect } from 'mongoose';

// Connection to mongoose
connect('mongodb://127.0.0.1:27017/soloproject');

// Interface for user
interface IUser {
  name: string;
  email: string;
  password: string;
  points: number;
  tasks: Array<{index: number, text: string, done: boolean}>;
}

// Schema for users collection
const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  password: String,
  points: Number,
  tasks: [{index: Number, text: String, done: Boolean}]
});

const User = model<IUser>('User', userSchema);

export { mongoose, User, userSchema };