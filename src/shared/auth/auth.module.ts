import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigService } from '../config/config.service';
import { UsersModule } from '../../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guard';

const config = new ConfigService();

@Module({
  controllers: [AuthController],
  providers: [JwtStrategy, LocalStrategy, AuthService, LocalAuthGuard],
  exports: [AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: config.JWT_SECRET_KEY,
      signOptions: { expiresIn: config.JWT_EXPIRATION },
    }),
  ],
})
export class AuthModule {}
