import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/config/config.service';
import { UserEntity } from './users/user.entity';

const config = new ConfigService();

@Module({
  imports: [
    UsersModule,
    BoardsModule,
    TasksModule,
    SharedModule,
    TypeOrmModule.forRoot({
      type: config.DB_TYPE,
      host: config.DB_HOST,
      port: config.DB_PORT,
      database: config.POSTGRES_DB,
      username: config.POSTGRES_USER,
      password: config.POSTGRES_PASSWORD,
      logging: true,
      synchronize: true,
      keepConnectionAlive: true,
      entities: [UserEntity],
    }),
  ],
})
export class AppModule {}
