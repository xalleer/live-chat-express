import { User } from '../models/User';
import { LoginReq, RegisterReq } from '../types/auth.types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config';

export class AuthService {
  public registerUser = async ({ username, password }: RegisterReq) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error('Username already taken');
    const hashedPassword = await this.generatePasswordHash(password);
    const user = await User.create({ username, password: hashedPassword });
    const token = this.generateToken(user._id.toString());
    return {
      token,
      user: {
        id: user._id.toString(),
        username: user.username!,
      },
    };
  };

  public loginUser = async ({ username, password }: LoginReq) => {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');
    if (!user.password) throw new Error('Password not set');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');
    const token = this.generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id.toString(),
        username: user.username!,
      },
    };
  };

  private generatePasswordHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(Number(config.salt_round));
    return bcrypt.hash(password, salt);
  };

  private generateToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.secret_token, { expiresIn: '7d' });
  };
}
