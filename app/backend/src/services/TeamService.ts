import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) {}

  async getTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { statusCode: 200, data: teams };
  }
}
