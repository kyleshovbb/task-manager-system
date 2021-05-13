const UserModel = require('./user.model');
const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const findById = (id) => usersRepo.findById(id);

const save = (userData) => {
  const newUser = new UserModel(userData);
  usersRepo.save(newUser);
  return newUser;
};

module.exports = { getAll, save, findById };
