const UserModel = require('./user.model');
const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

/** @module UserService */

/**
 * Get all users
 * @return {Promise<Array<User>>} All users which were created and saved
 */
const getAll = () => usersRepo.getAll();

/**
 * Find user by user id
 * @param {string} id User id
 * @return {Promise<User>} Found user
 */
const findById = (id) => usersRepo.findById(id);

/**
 * Remove user by user id
 * @param {string} id User id
 * @return {Promise<void>} Empty promise
 */
const remove = async (userId) => {
  await usersRepo.remove(userId);
  tasksService.unassignUsersById(userId);
};

/**
 * Create user by user data and save to users repository
 * @async
 * @param {Object} userData User data for creating new User
 * @return {Promise<User>} Saved User
 */
const save = async (userData) => {
  const newUser = new UserModel(userData);
  await usersRepo.save(newUser);
  return newUser;
};

/**
 * Update user by updated user data
 * @async
 * @param {string} userId User id
 * @param {Object} userData User data for updating user
 * @return {Promise<User>} Updated user
 */
const update = async (userId, userData) => {
  const user = await findById(userId);
  user.update(userData);
  return user;
};

module.exports = { getAll, remove, save, findById, update };
