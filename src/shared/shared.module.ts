import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigService } from './config/config.service';

@Module({
  providers: [ConfigService],
  imports: [LoggerModule, AuthModule],
  exports: [LoggerModule, AuthModule],
})
export class SharedModule {}
