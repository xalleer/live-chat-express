import { z } from '../lib/zod';

export const CreateRoomReqSchema = z.object({
  title: z.string().min(1).max(100),
});

export const RoomResponseSchema = z.object({
  _id: z.string(),
  title: z.string(),
  participants: z.array(z.string()),
  createdBy: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
