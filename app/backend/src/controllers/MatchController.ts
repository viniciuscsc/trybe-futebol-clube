import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  async getMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    // inProgress é a variável que receberá "true" ou "false"
    // o tipo recebido é uma string, não boolean

    const { statusCode } = await this.matchService.getMatches();
    return res.status(statusCode).json(typeof inProgress);
  }
}
