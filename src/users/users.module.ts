import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [TasksModule],
})
export class UsersModule {}
