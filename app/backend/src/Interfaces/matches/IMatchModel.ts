import { IMatch } from './IMatch';
import { IUpdatedMatch } from './IUpdatedMatch';

export interface IMatchModel {
  findAll(inProgress?: boolean): Promise<IMatch[]>;

  endMatch(id: IMatch['id']): Promise<void>;

  updateMatch(updatedMatchData: IUpdatedMatch): Promise<void>;

  createMatch(matchData: Partial<IMatch>): Promise<IMatch>;
}
