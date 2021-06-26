import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../../common/config';
import { JwtPayload } from '../../types/jwt.types';

export function getHashedPassword(password: string): string {
  return bcrypt.hashSync(password, 8);
}

export function checkIfPasswordMatch(
  unhashedPassword: string,
  hashedPassword: string
): boolean {
  return bcrypt.compareSync(unhashedPassword, hashedPassword);
}

export function createJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_EXPIRATION,
  });
}
