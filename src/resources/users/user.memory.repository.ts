import { EntityRepository, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserRequest } from './user.types';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createAndSave(userData: CreateUserRequest) {
    const newUser = this.create();
    newUser.name = userData.name;
    newUser.login = userData.login;
    newUser.password = userData.password;
    return this.save(newUser);
  }
}
