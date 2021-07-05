import jwt from 'jsonwebtoken';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from './interfaces/auth.interfaces';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '../config/config.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private config: ConfigService
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      throw new HttpException(
        'You need to be logged in to visit this route',
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = req.headers.authorization.replace('Bearer', '').trim();

    try {
      const decoded = jwt.verify(
        token,
        this.config.JWT_SECRET_KEY
      ) as JwtPayload;

      const user = await this.usersService.findById(decoded.userId);

      if (user) {
        next();
      } else {
        throw new HttpException(
          'You need to be logged in to visit this route',
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (err) {
      throw new HttpException(
        'You need to be logged in to visit this route',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
