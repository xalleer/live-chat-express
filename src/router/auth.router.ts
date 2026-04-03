import { Router } from 'express';
import { validate } from '../middlewares/validateData';
import { RegisterReqSchema, LoginReqSchema } from '../validation/auth.schemas';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(RegisterReqSchema), authController.register);
router.post('/login', validate(LoginReqSchema), authController.login);

export default router;
