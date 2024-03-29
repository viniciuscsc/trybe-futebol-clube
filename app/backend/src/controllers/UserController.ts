import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private userService = new UserService(),
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
    const { statusCode, data } = await this.userService.login(req.body);

    if (statusCode === 401) return res.status(statusCode).json(data);
    return res.status(statusCode).json({ token: data });
  }

  static async getUserRole(_req: Request, res: Response): Promise<Response> {
    const { role } = res.locals.user;
    return res.status(200).json({ role });
  }
}
