import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate';
import { validate } from '../middlewares/validateData';
import { RoomController } from '../controllers/room.controller';
import { CreateRoomReqSchema } from '../validation/room.schemas';

const roomController = new RoomController();
const router = Router();

router.post(
  '/',
  authenticate,
  validate(CreateRoomReqSchema),
  roomController.createChatRoom,
);

router.get('/', authenticate, roomController.getChatRooms);
router.get('/:id', authenticate, roomController.getChatRoomById);

export default router;
