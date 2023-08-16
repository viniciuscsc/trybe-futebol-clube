import MatchModel from '../models/MatchModel';

import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  async getMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll(inProgress);
    return { statusCode: 200, data: matches };
  }

  async endGame(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.endGame(id);
    return { statusCode: 200, data: { message: 'Finished' } };
  }
}
