import { User } from './user.types';

export interface RegisterReq {
  username: string;
  password: string;
}

export interface RegisterRes {
  token: string;
  user: User;
}

export type LoginReq = RegisterReq;
export type LoginRes = RegisterRes;
