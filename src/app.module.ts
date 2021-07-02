import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [UsersModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
