import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule, AuthModule],
  exports: [LoggerModule, AuthModule],
})
export class SharedModule {}
