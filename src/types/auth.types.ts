export interface RegisterReq {
  username: string;
  password: string;
}

export interface RegisterRes {
  token: string;
  user: {
    username: string;
    id: string;
  };
}

export type LoginReq = RegisterReq;
export type LoginRes = RegisterRes;
