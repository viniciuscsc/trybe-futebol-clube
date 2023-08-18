import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';

import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamStats } from '../Interfaces/teams/ITeamStats';

import { getTeamStats } from '../utils/teamStats.util';
import { getHomeTeamStats } from '../utils/homeTeamStats.util';
import { getAwayTeamStats } from '../utils/awayTeamStats.util';
import sortLeaderboard from '../utils/sortLeaderboard.util';

export default class LeaderboardService {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  async leaderboard(): Promise<ServiceResponse<ITeamStats[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(false);
    const leaderboard: ITeamStats[] = [];

    teams.forEach(({ id, teamName }) => {
      const statsTeam = getTeamStats(teamName, id, matches);
      leaderboard.push(statsTeam);
    });

    const sortedLeaderboard = sortLeaderboard(leaderboard);

    return { statusCode: 200, data: sortedLeaderboard };
  }

  async leaderboardHome(): Promise<ServiceResponse<ITeamStats[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(false);
    const leaderboardHome: ITeamStats[] = [];

    teams.forEach(({ id, teamName }) => {
      const statsTeam = getHomeTeamStats(teamName, id, matches);
      leaderboardHome.push(statsTeam);
    });

    const sortedLeaderboard = sortLeaderboard(leaderboardHome);

    return { statusCode: 200, data: sortedLeaderboard };
  }

  async leaderboardAway(): Promise<ServiceResponse<ITeamStats[]>> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll(false);
    const leaderboardAway: ITeamStats[] = [];

    teams.forEach(({ id, teamName }) => {
      const statsTeam = getAwayTeamStats(teamName, id, matches);
      leaderboardAway.push(statsTeam);
    });

    const sortedLeaderboard = sortLeaderboard(leaderboardAway);

    return { statusCode: 200, data: sortedLeaderboard };
  }
}
