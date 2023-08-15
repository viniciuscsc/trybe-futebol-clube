import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProgress?: string): Promise<IMatch[]>;
}
