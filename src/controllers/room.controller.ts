import { RoomService } from '../services/room.service';
import { Response } from 'express';
import { AuthRequest } from '../middlewares/authenticate';

const roomService = new RoomService();

export class RoomController {
  public createChatRoom = async (req: AuthRequest, res: Response) => {
    try {
      const { title } = req.body;

      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const response = await roomService.createRoom(title, req.userId);
      return res.status(201).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };

  public getChatRooms = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const response = await roomService.getRooms();
      return res.status(200).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };

  public getChatRoomById = async (req: AuthRequest, res: Response) => {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const roomId = req.params.id;
      if (!roomId) {
        return res.status(400).json({ message: 'Room id not provided' });
      }
      if (Array.isArray(roomId)) {
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
