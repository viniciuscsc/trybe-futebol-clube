import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IUserPayload } from '../Interfaces/users/IUserPayload';
import { IUserLogin } from '../Interfaces/users/IUserLogin';
import { signToken } from '../utils/jwt.util';

const INVALID_LOGIN = 'Invalid email or password';

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
    if (!user) return { statusCode: 401, data: { message: INVALID_LOGIN } };
    return { statusCode: 200, data: user };
  }

  async login(loginData: IUserLogin): Promise<ServiceResponse<IUser | string>> {
    const { email, password } = loginData;
    const user = await this.userModel.findByEmail(email);
    if (!user) return { statusCode: 401, data: { message: INVALID_LOGIN } };
    if (!bcrypt.compareSync(password, user.password)) {
      return { statusCode: 401, data: { message: INVALID_LOGIN } };
    }
    const tokenPayload: IUserPayload = { email: user.email, role: user.role };
    const token = signToken(tokenPayload);
    return { statusCode: 200, data: token };
  }
}
