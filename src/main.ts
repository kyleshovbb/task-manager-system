import { NestFactory } from '@nestjs/core';
import config from './common/config';
import { AppModule } from './app.module';
import { LoggerService } from './shared/logger/logger.services';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LoggerService));
  await app.listen(config.PORT);
}
bootstrap();
