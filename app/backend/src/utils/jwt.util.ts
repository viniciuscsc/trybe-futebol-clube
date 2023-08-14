import * as jwt from 'jsonwebtoken';
import { IUserPayload } from '../Interfaces/users/IUserPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

export function signToken(payload: IUserPayload): string {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
}

export function verifyToken(token: string): IUserPayload | string {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as IUserPayload;
    return payload;
  } catch (error) {
    const invalidToken = 'Token must be a valid token';
    return invalidToken;
  }
}
