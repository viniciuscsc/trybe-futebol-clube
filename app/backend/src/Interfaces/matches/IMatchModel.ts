import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>;

  endGame(id: IMatch['id']): Promise<void>;
}
