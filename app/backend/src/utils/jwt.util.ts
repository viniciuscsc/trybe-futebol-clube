import * as jwt from 'jsonwebtoken';
import { IPayload } from '../Interfaces/users/IPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export function signToken(payload: IPayload): string {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

export function verifyToken(token: string): IPayload | string {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IPayload;
    return payload;
  } catch (error) {
    const invalidToken = 'Token must be a valid token';
    return invalidToken;
  }
}
