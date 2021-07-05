import {
  Post,
  Body,
  Controller,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { AuthService } from './auth.services';
import { AuthRequest, JwtPayload } from './interfaces/auth.interfaces';

@Controller()
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Post('login')
  async login(@Body() body: AuthRequest) {
    const user = await this.userService.findByLogin(body.login);

    if (!user) {
      throw new HttpException(
        'The user is not yet registered',
        HttpStatus.FORBIDDEN
      );
    }

    const passwordMatch = this.authService.checkIfPasswordMatch(
      body.password,
      user.password
    );

    if (!passwordMatch) {
      throw new HttpException(
        'The password does not match',
        HttpStatus.FORBIDDEN
      );
    }

    const jwtPayload: JwtPayload = {
      login: user.login,
      userId: user.id,
    };

    const token = this.authService.createJwtToken(jwtPayload);

    return { token };
  }
}
