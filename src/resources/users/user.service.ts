import UserModel from './user.model';
import usersRepo from './user.memory.repository';
import {unassignUsersById} from '../tasks/task.service';

export const getAll = () => usersRepo.getAll();

export const findById = (id) => usersRepo.findById(id);

export const remove = async (userId) => {
  await usersRepo.remove(userId);
  unassignUsersById(userId);
};

export const save = (userData) => {
  const newUser = new UserModel(userData);
  usersRepo.save(newUser);
  return newUser;
};

export const update = async (userId, userData) => {
  const user = await findById(userId);
  user.update(userData);
  return user;
};