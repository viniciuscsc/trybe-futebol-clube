import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    // inProgress é a variável que receberá "true" ou "false"
    // o tipo recebido é uma string, não boolean
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
}
