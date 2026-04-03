import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, require: true },
  password: { type: String },
});

export const User = model('User', userSchema);
