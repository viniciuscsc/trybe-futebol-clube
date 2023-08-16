import MatchModel from '../models/MatchModel';

import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IUpdatedMatch } from '../Interfaces/matches/IUpdatedMatch';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  async getMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll(inProgress);
    return { statusCode: 200, data: matches };
  }

  async endMatch(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.endMatch(id);
    return { statusCode: 200, data: { message: 'Finished' } };
  }

  async updateMatch(updatedMatchData: IUpdatedMatch): Promise<ServiceResponse<ServiceMessage>> {
    await this.matchModel.updateMatch(updatedMatchData);
    return { statusCode: 200, data: { message: 'Updated' } };
  }
}
