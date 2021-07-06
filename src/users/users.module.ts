import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TasksModule } from '../tasks/tasks.module';
import { UserEntity } from './user.entity';
import { ConfigService } from '../shared/config/config.service';
import { AdminService } from './admin.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AdminService, ConfigService],
  exports: [UsersService],
  imports: [TasksModule, TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule implements OnModuleInit {
  constructor(private adminService: AdminService) {}

  onModuleInit() {
    this.adminService.hasAdmin().then((hasAdmin) => {
      if (!hasAdmin) {
        this.adminService.generateAdmin();
      }
    });
  }
}
