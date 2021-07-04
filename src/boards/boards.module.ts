import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from '../tasks/tasks.module';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './board.entity';

@Module({
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [BoardsService],
  imports: [TasksModule, TypeOrmModule.forFeature([BoardEntity])],
})
export class BoardsModule {}
