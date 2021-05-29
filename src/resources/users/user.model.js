const uuid = require('uuid');

/** @module UserModel */

/** Class representing a user */
class User {
  /**
   * Create user
   * @param {Object} userData User data for creating new user
   * @param {string} userData.id User id
   * @param {string} userData.name User name
   * @param {number} userData.login User login
   * @param {string} userData.password User password
   */
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Get user data for HTTP response
   * @return {Object} User data without password
   */
  toResponse() {
    return { id: this.id, name: this.name, login: this.login };
  }

  /**
   * Update user data
   * @param {Object} userData User data for updating user
   * @param {string} userData.name User name
   * @param {number} userData.login User login
   * @param {string} userData.password User password
   */
  update({ name = this.name, login = this.login, password = this.password }) {
    this.name = name;
    this.login = login;
    this.password = password;
  }
}

module.exports = User;
