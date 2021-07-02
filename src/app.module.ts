import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [UsersModule, BoardsModule, TasksModule],
})
export class AppModule {}
