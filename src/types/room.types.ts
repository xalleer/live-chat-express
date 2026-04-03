import { User } from '../types/user.types';

export interface ChatRoomPostReq {
  title: string;
  userId: string;
}

export interface ChatRoom {
  title: string;
  _id: string;
  participants: User[];
  createdBy: User;
}
