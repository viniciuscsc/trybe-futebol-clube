import { Request, Response } from 'express';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { getGoalsFavor, getGoalsOwn } from '../utils/teamStatistics.util';
import { IStatsTeam } from '../Interfaces/teams/IStatsTeam';

export default class LeaderboardController {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  async leaderboardHome(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const leaderboardHome: Array<IStatsTeam> = [];

    teams.forEach((team) => {
      const statsTeam = {
        name: team?.teamName,
        goalsFavor: getGoalsFavor(team.id, matches),
        goalsOwn: getGoalsOwn(team.id, matches),
      };
      leaderboardHome.push(statsTeam);
    });

    return res.status(200).json(leaderboardHome);
  }
}
