import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) {}

  async getTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { statusCode: 200, data: teams };
  }

  async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { statusCode: 404, data: { message: 'Team not found' } };
    return { statusCode: 200, data: team };
  }
}
