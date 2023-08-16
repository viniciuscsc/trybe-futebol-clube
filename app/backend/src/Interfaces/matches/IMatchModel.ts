import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>;

  endMatch(id: IMatch['id']): Promise<void>;

}
