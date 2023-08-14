import { NextFunction, Request, Response } from 'express';
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

  static validateToken(req: Request, res: Response, next: NextFunction)
    : Response | void {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = authorization.split(' ')[1];

    const validToken = verifyToken(token);

    if (validToken === 'invalidToken') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    res.locals.user = validToken;

    next();
  }
}
