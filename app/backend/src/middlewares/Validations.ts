import { NextFunction, Request, Response } from 'express';

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
}
