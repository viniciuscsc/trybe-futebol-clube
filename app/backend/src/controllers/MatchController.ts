import { Request, Response } from 'express';

import MatchService from '../services/MatchService';

import { IUpdatedMatch } from '../Interfaces/matches/IUpdatedMatch';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    const inProgressString = req.query.inProgress;

    if (!inProgressString) {
      const { statusCode, data } = await this.matchService.getMatches();
      return res.status(statusCode).json(data);
    }

    const inProgress = inProgressString === 'true';

    const { statusCode, data } = await this.matchService.getMatches(inProgress);
    return res.status(statusCode).json(data);
  }

  async endMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { statusCode, data } = await this.matchService.endMatch(Number(id));
    return res.status(statusCode).json(data);
  }

  async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updatedMatchData: IUpdatedMatch = { id: Number(id), homeTeamGoals, awayTeamGoals };

    const { statusCode, data } = await this.matchService.updateMatch(updatedMatchData);

    return res.status(statusCode).json(data);
  }
}
