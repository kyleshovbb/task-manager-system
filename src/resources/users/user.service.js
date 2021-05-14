const UserModel = require('./user.model');
const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const findById = (id) => usersRepo.findById(id);

const remove = async (userId) => {
  await usersRepo.remove(userId);
  tasksService.unassignUsersById(userId);
};

const save = (userData) => {
  const newUser = new UserModel(userData);
  usersRepo.save(newUser);
  return newUser;
};

const update = async (userId, userData) => {
  const user = await findById(userId);
  user.update(userData);
  return user;
};

module.exports = { getAll, remove, save, findById, update };
