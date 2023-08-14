import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import UserService from '../services/UserService';
import UserModel from '../models/UserModel';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

type Payload = {
  email: string,
  role: string,
};

function signToken(payload: Payload): string {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

// function verifyToken(token: string): Payload | string {
//   try {
//     const payload = jwt.verify(token, JWT_SECRET) as Payload;
//     return payload;
//   } catch (error) {
//     const invalidToken = 'Token must be a valid token';
//     return invalidToken;
//   }
// }

export default class UserController {
  constructor(
    private userService = new UserService(),
    private userModel = new UserModel(),
  ) {}

  async getUsers(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.userService.getUsers();
    return res.status(statusCode).json(data);
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { statusCode, data } = await this.userService.getUserById(Number(id));
    return res.status(statusCode).json(data);
  }

  async getUserByEmail(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const { statusCode, data } = await this.userService.getUserByEmail(email);
    return res.status(statusCode).json(data);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const user = await this.userModel.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const tokenPayload: Payload = { email: user.email, role: user.role };
    const token = signToken(tokenPayload);
    return res.status(200).json({ token });
  }
}
