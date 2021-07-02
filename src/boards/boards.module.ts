import { Module } from '@nestjs/common';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './boards.repository';

@Module({
  providers: [BoardsService, BoardsRepository],
  controllers: [BoardsController],
  exports: [BoardsService],
  imports: [TasksModule],
})
export class BoardsModule {}
