import { Injectable } from '@nestjs/common';
import { UserModel } from './users.model';

@Injectable()
export class UsersRepository {
  private users: UserModel[];

  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async save(user: UserModel) {
    this.users.push(user);
  }

  async remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
