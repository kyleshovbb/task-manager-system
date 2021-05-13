class UsersRepository {
  constructor() {
    this.users = [];
  }

  async getAll() {
    return this.users;
  }

  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  async save(user) {
    return this.users.push(user);
  }
}

module.exports = new UsersRepository();
