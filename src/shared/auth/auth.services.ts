import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JwtPayload } from './interfaces/auth.interfaces';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthService {
  constructor(private config: ConfigService) {}

  getHashedPassword(password: string): string {
    return bcrypt.hashSync(password, 8);
  }

  checkIfPasswordMatch(
    unhashedPassword: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(unhashedPassword, hashedPassword);
  }

  createJwtToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.config.JWT_SECRET_KEY, {
      expiresIn: this.config.JWT_EXPIRATION,
    });
  }
}
