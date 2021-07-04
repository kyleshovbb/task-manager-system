import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { BoardsModule } from './boards/boards.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [UsersModule, BoardsModule, TasksModule, SharedModule],
})
export class AppModule {}
