import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '../types/auth.types';

const authService = new AuthService();

export class AuthController {
  public register = async (req: Request, res: Response) => {
    try {
      const response: RegisterRes = await authService.registerUser(
        req.body as RegisterReq,
      );
      return res.status(201).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const response: LoginRes = await authService.loginUser(
        req.body as LoginReq,
      );
      return res.status(200).json(response);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      return res.status(400).json({ message });
    }
  };
}
