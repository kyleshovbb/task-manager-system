import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserRequest } from './user.types';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getAll() {
    return this.find();
  }

  async findById(id: string) {
    return this.findOne(id);
  }

  createAndSave(userData: CreateUserRequest) {
    const newUser = this.create();
    if (userData.name) newUser.name = userData.name;
    if (userData.login) newUser.login = userData.login;
    if (userData.password) newUser.password = userData.password;
    return this.save(newUser);
  }

  removeById(id: string) {
    return this.findById(id).then(async (user) => {
      if (user) await this.remove(user);
      return user;
    });
  }
}
