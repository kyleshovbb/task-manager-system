import { Injectable } from '@nestjs/common';

import { UserModel } from './users.model';
import { UsersRepository } from './users.repository';
import {
  CreateUserRequest,
  UpdateUserRequest,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getAll() {
    return this.usersRepository.getAll();
  }

  findById(id: string) {
    return this.usersRepository.findById(id);
  }

  async remove(userId: string) {
    return Promise.allSettled([this.usersRepository.remove(userId)]);
  }

  async save(userData: CreateUserRequest) {
    const newUser = new UserModel(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(userId: string, userData: UpdateUserRequest) {
    const user = await this.findById(userId);
    if (user) user.update(userData);
    return user;
  }
}
