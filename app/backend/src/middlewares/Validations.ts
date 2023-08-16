import { NextFunction, Request, Response } from 'express';

import verifyId from '../utils/verifyId.util';
import { verifyToken } from '../utils/jwt.util';

export default class Validations {
  static validateRequiredLoginFiels(req: Request, res: Response, next: NextFunction)
    : Response | void {
    const { email, password } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMinLength = 6;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const emailInValidFormat: boolean = emailRegex.test(email);

    if (!emailInValidFormat || password.length < passwordMinLength) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const auth = req.headers.authorization;

    if (!auth) return res.status(401).json({ message: 'Token not found' });

    const data = auth.split(' ');
    const token = data[data.length - 1];

    const validToken = verifyToken(token);

    if (validToken === 'invalidToken') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    res.locals.user = validToken;

    next();
  }

  static async validateIds(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    const homeTeam = await verifyId(homeTeamId);
    const awayTeam = await verifyId(awayTeamId);

    if (!homeTeam || !awayTeam) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    next();
  }
}
