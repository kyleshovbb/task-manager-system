import { NestFactory } from '@nestjs/core';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from './shared/config/config.service';
import { LoggerService } from './shared/logger/logger.service';

const config = new ConfigService();

async function createFastifyServer() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.useLogger(app.get(LoggerService));

  await app.listen(config.PORT, '0.0.0.0');
}

async function createExpressServer() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(LoggerService));

  await app.listen(config.PORT);
}

function bootstrap() {
  if (config.USE_FASTIFY) {
    createFastifyServer();
  } else {
    createExpressServer();
  }
}
bootstrap();
