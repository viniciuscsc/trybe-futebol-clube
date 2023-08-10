import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  async getTeams(_req: Request, res: Response): Promise<Response> {
    const { statusCode, data } = await this.teamService.getTeams();
    return res.status(statusCode).json(data);
  }

  async getTeamById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { statusCode, data } = await this.teamService.getTeamById(Number(id));
    return res.status(statusCode).json(data);
  }
}
