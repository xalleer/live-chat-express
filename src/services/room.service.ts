import { Room } from '../models/Room';

export class RoomService {
  public createRoom = async (title: string, userId: string) => {
    const room = await Room.create({
      title,
      createdBy: userId,
      participants: [userId],
    });

    return room;
  };

  public getRooms = async () => {
    const rooms = await Room.find();
    return rooms;
  };

  public getRoomById = async (roomId: string) => {
    const room = await Room.findById(roomId);
    return room;
  };
}
