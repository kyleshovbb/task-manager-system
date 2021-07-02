import { Injectable } from '@nestjs/common';

import UserModel from './users.model';
import { UsersRepository } from './users.repository';
import {
  CreateUserRequest,
  UpdateTaskRequest,
} from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getAll() {
    return this.usersRepository.getAll();
  }

  findById = (id: string) => this.usersRepository.findById(id);

  remove = async (userId: string) =>
    Promise.allSettled([this.usersRepository.remove(userId)]);

  save = async (userData: CreateUserRequest) => {
    const newUser = new UserModel(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  };

  update = async (userId: string, userData: UpdateTaskRequest) => {
    const user = await this.findById(userId);
    if (user) user.update(userData);
    return user;
  };
}
