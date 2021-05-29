/** @module UserMemoryRepository */

/** Class representing users repository */
class UsersRepository {
  /**
   * Create users repository
   */
  constructor() {
    this.users = [];
  }

  /**
   * Get all users
   * @async
   * @return {Promise<Array<User>>} All users which were created and saved
   */
  async getAll() {
    return this.users;
  }

  /**
   * Find user by user id
   * @async
   * @param {string} id User id
   * @return {Promise<User>} Found user
   */
  async findById(id) {
    return this.users.find((user) => user.id === id);
  }

  /**
   * Save new user
   * @async
   * @param {User} user Saved user
   * @return {Promise<void>} Empty promise
   */
  async save(user) {
    this.users.push(user);
  }

  /**
   * Remove user by user id
   * @async
   * @param {string} id User id
   * @return {Promise<void>} Empty promise
   */
  async remove(id) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}

module.exports = new UsersRepository();
