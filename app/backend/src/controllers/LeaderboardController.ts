import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async leaderboard(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.leaderboardService.leaderboard();
    return res.status(statusCode).json(data);
  }

  async leaderboardHome(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.leaderboardService.leaderboardHome();
    return res.status(statusCode).json(data);
  }

  async leaderboardAway(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.leaderboardService.leaderboardAway();
    return res.status(statusCode).json(data);
  }
}
