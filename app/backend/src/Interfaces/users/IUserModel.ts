import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>;

  findById(id: IUser['id']): Promise<IUser>;

  findByEmail(email: IUser['email']): Promise<IUser>;
}
