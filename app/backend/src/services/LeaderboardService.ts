import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamStats } from '../Interfaces/teams/ITeamStats';

import { getGames, getGoals } from '../utils/teamStats.util';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
    private _leaderboardHome: ITeamStats[] = [],
  ) {}

  async leaderboardHome(): Promise<ServiceResponse<ITeamStats[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    teams.forEach((team) => {
      const statsTeam = {
        name: team?.teamName,
        totalPoints: getGames(team.id, matches).points,
        totalGames: getGames(team.id, matches).games,
        totalVictories: getGames(team.id, matches).victories,
        totalDraws: getGames(team.id, matches).draws,
        totalLosses: getGames(team.id, matches).losses,
        goalsFavor: getGoals(team.id, matches).goalsFavor,
        goalsOwn: getGoals(team.id, matches).goalsOwn,
        goalsBalance: getGoals(team.id, matches).goalsBalance,
        efficiency: getGames(team.id, matches).efficiency,
      };
      this._leaderboardHome.push(statsTeam);
    });

    return { statusCode: 200, data: this._leaderboardHome };
  }
}
