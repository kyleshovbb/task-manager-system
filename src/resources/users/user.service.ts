import UserModel from './user.model';
import usersRepo from './user.memory.repository';
import { UserRequest } from './user.types';
import { unassignUsersById } from '../tasks/task.service';

export const getAll = () => usersRepo.getAll();

export const findById = (id: string) => usersRepo.findById(id);

export const remove = async (userId: string) => {
  await usersRepo.remove(userId);
  unassignUsersById(userId);
};

export const save = (userData: UserRequest) => {
  const newUser = new UserModel(userData);
  usersRepo.save(newUser);
  return newUser;
};

export const update = async (userId: string, userData: UserRequest) => {
  const user = await findById(userId);
  if (user) user.update(userData);
  return user;
};
