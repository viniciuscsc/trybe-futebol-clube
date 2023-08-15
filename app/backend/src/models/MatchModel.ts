import SequelizeMatch from '../database/models/SequelizeMatch';

import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll();
    return matches;
  }
}
