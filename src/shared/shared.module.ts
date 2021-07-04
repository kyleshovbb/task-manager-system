import { Module } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  providers: [ConfigService],
  imports: [LoggerModule],
  exports: [LoggerModule],
})
export class SharedModule {}
