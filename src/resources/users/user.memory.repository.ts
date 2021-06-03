import User from './user.model';

class UsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }

  async save(user: User) {
    this.users.push(user);
  }

  async remove(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

const usersRepository = new UsersRepository();

export default usersRepository;
