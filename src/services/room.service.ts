import { Room } from '../models/Room';
import { ChatRoomPostReq } from '../types/room.types';

export class RoomService {
  public createRoom = async (data: ChatRoomPostReq) => {
    const room = await Room.create({
      title: data.title,
      createdBy: data.userId,
      participants: [data.userId],
    });

    return room;
  };

  public getRooms = async (limit: number = 20, skip: number = 0) => {
    const rooms = await Room.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    return rooms;
  };

  public getRoomById = async (roomId: string) => {
    const room = await Room.findById(roomId)
      .populate('participants', 'username')
      .populate('createdBy', 'username');
    return room;
  };
}
