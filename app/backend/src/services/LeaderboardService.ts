import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamStats } from '../Interfaces/teams/ITeamStats';

import { getTeamStats } from '../utils/teamStats.util';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
    private _leaderboardHome: ITeamStats[] = [],
  ) {}

  async leaderboardHome(): Promise<ServiceResponse<ITeamStats[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    teams.forEach(({ id, teamName }) => {
      const statsTeam = getTeamStats(teamName, id, matches);
      this._leaderboardHome.push(statsTeam);
    });

    return { statusCode: 200, data: this._leaderboardHome };
  }
}
