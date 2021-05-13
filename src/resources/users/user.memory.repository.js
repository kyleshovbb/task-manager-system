class UsersRepository {
  constructor() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  findById(id) {
    return this.users.find((user) => user.id === id);
  }

  save(user) {
    return this.users.push(user);
  }
}

module.exports = new UsersRepository();
