import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import {
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from '../types/auth.types';

const { registerUser, loginUser } = new AuthService();

export class AuthController {
  public register = async (req: Request, res: Response) => {
    try {
      const response: RegisterRes = await registerUser(req.body as RegisterReq);
      return res.status(201).json(response);
    } catch (e) {
      return res.status(400).json(e);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const response: LoginRes = await loginUser(req.body as LoginReq);
      return res.status(200).json(response);
    } catch (e) {
      return res.status(400).json(e);
    }
  };
}
