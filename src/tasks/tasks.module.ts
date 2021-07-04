import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './task.entity';

@Module({
  providers: [TasksService],
  controllers: [TasksController],
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  exports: [TasksService],
})
export class TasksModule {}
