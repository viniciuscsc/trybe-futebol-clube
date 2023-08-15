import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getMatches(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.matchService.getMatches();
    return res.status(statusCode).json(data);
  }
}
