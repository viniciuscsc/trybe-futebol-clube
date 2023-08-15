import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>;

  update(id: IMatch['id']): Promise<void>;
}
