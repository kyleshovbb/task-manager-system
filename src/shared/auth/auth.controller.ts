import { Post, Request, Controller, UseGuards } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { UserResponse } from '../../users/interfaces/user.interface';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: ExpressRequest) {
    return this.authService.login(req.user as UserResponse);
  }
}
