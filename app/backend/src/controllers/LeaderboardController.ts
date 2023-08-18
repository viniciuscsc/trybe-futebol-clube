import { Request, Response } from 'express';
import TeamModel from '../models/TeamModel';
import MatchModel from '../models/MatchModel';
import { getGames, getGoals } from '../utils/teamStatistics.util';
import { ITeamStats } from '../Interfaces/teams/ITeamStats';

export default class LeaderboardController {
  constructor(
    private teamModel = new TeamModel(),
    private matchModel = new MatchModel(),
  ) {}

  async leaderboardHome(_req: Request, res: Response): Promise<Response> {
    const teams = await this.teamModel.findAll();
    const matches = await this.matchModel.findAll();

    const leaderboardHome: ITeamStats[] = [];

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
      };
      leaderboardHome.push(statsTeam);
    });

    return res.status(200).json(leaderboardHome);
  }
}
