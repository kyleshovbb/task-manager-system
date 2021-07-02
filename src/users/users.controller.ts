import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from './interfaces/user.interface';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  async findAll() {
    const users = await this.userService.getAll();
    // map user fields to exclude secret fields like "password"
    return users.map((user) => user.toResponse());
  }

  @Post()
  async create(@Body() body: CreateUserRequest) {
    const newUser = await this.userService.save(body);
    return newUser.toResponse();
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    const user = await this.userService.findById(userId);

    if (user) {
      return user.toResponse();
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Put(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() body: UpdateUserRequest
  ) {
    const user = await this.userService.update(userId, body);

    if (user) {
      return user.toResponse();
    }

    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    await this.userService.remove(userId);
  }
}
