import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from '../tasks/tasks.service';
import { UserRequest } from './interfaces/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    private tasksService: TasksService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  getAll() {
    return this.usersRepository.find();
  }

  findById(id: string) {
    return this.usersRepository.findOne(id);
  }

  findByLogin(login: string) {
    return this.usersRepository.findOne({ where: { login } });
  }

  async remove(userId: string) {
    return Promise.allSettled([
      this.usersRepository.delete(userId),
      this.tasksService.unassignUsersById(userId),
    ]);
  }

  async createAndSave(userData: UserRequest) {
    const newUser = this.usersRepository.create();
    newUser.name = userData.name;
    newUser.login = userData.login;
    newUser.password = bcrypt.hashSync(userData.password, 8);
    return this.usersRepository.save(newUser);
  }

  async update(userId: string, userData: UserRequest) {
    const updatedUserDate = {
      ...userData,
      password: bcrypt.hashSync(userData.password, 8),
    };
    return this.usersRepository.update(userId, updatedUserDate);
  }
}
