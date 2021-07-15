import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/auth.interfaces';
import { UsersService } from '../../users/users.service';
import { UserResponse } from '../../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    login: string,
    pass: string
  ): Promise<UserResponse | null> {
    const user = await this.usersService.findByLogin(login);

    if (user && bcrypt.compareSync(pass, user.password)) {
      return user.toResponse();
    }

    return null;
  }

  async login(user: UserResponse) {
    const payload: JwtPayload = { login: user.login, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
