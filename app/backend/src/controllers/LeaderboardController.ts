import { Request, Response } from 'express';

import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  async leaderboardHome(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.leaderboardService.leaderboardHome();
    return res.status(statusCode).json(data);
  }
}
