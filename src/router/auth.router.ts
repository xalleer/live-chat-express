import { Router } from 'express';
import { validate } from '../middlewares/validateData';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;
