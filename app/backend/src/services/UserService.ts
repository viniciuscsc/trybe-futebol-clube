import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class UserService {
  constructor(
    private userModel = new UserModel(),
  ) {}

  async getUsers(): Promise<ServiceResponse<IUser[]>> {
    const users = await this.userModel.findAll();
    return { statusCode: 200, data: users };
  }

  async getUserById(id: number): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);
    if (!user) return { statusCode: 404, data: { message: 'User not found' } };
    return { statusCode: 200, data: user };
  }

  async getUserByEmail(email: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { statusCode: 401, data: { message: 'Invalid email or password' } };
    return { statusCode: 200, data: user };
  }
}
