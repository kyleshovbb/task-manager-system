import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TasksModule } from '../tasks/tasks.module';
import { UserEntity } from './user.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TasksModule, TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
