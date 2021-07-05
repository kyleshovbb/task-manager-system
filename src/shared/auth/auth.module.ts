import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthService } from './auth.services';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { ConfigService } from '../config/config.service';
import { UsersModule } from '../../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ConfigService],
  exports: [AuthService, ConfigService],
  imports: [UsersModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'login', method: RequestMethod.POST })
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
