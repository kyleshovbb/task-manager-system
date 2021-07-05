import { Injectable } from '@nestjs/common';
import { UserRequest } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Injectable()
export class AdminService {
  private readonly adminData: UserRequest = {
    name: 'admin',
    login: 'admin',
    password: 'admin',
  };

  constructor(private usersService: UsersService) {}

  async hasAdmin() {
    const admin = await this.usersService.findByLogin(this.adminData.login);
    return !!admin;
  }

  async generateAdmin() {
    await this.usersService.createAndSave(this.adminData);
  }
}
