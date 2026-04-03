import { Schema, model } from 'mongoose';

const roomSchema = new Schema(
  {
    title: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const Room = model('Room', roomSchema);
