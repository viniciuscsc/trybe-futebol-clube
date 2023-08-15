import MatchModel from '../models/MatchModel';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  async getMatches(): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    return { statusCode: 200, data: matches };
  }
}
