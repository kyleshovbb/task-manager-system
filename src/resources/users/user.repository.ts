import { EntityRepository, Repository } from 'typeorm';
import { getHashedPassword } from '../auth/auth.helpers';
import User from './user.entity';
import { UserRequest } from './user.types';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  createAndSave(userData: UserRequest) {
    const newUser = this.create();
    newUser.name = userData.name;
    newUser.login = userData.login;
    newUser.password = getHashedPassword(userData.password);
    return this.save(newUser);
  }

  updateAndHashPassword(userId: string, userData: UserRequest) {
    const updatedUserDate = {
      ...userData,
      password: getHashedPassword(userData.password),
    };
    return this.update(userId, updatedUserDate);
  }
}
