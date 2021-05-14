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

  async remove(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

module.exports = new UsersRepository();
