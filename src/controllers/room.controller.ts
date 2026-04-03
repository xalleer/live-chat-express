import { RoomService } from '../services/room.service';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';

const roomService = new RoomService();

export class RoomController {
  public createChatRoom = async (req: AuthRequest, res: Response) => {
    try {
      const response = await roomService.createRoom({
        title: req.body.title,
        userId: req.userId!,
      });
      return res.status(201).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };

  public getChatRooms = async (req: AuthRequest, res: Response) => {
    try {
      const response = await roomService.getRooms();
      return res.status(200).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };

  public getChatRoomById = async (req: AuthRequest, res: Response) => {
    try {
      const roomId = req.params.id;
      if (!roomId || Array.isArray(roomId)) {
        return res.status(400).json({ message: 'Invalid room id' });
      }

      const room = await roomService.getRoomById(roomId);

      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }

      return res.status(200).json(room);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };
}
