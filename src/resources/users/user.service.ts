import UserModel from './user.model';
import usersRepo from './user.memory.repository';
import { unassignUsersById } from '../tasks/task.service';
import { CreateUserRequest, UpdateTaskRequest } from './user.types';

export const getAll = () => usersRepo.getAll();

export const findById = (id: string) => usersRepo.findById(id);

export const remove = async (userId: string) =>
  Promise.allSettled([usersRepo.remove(userId), unassignUsersById(userId)]);

export const save = async (userData: CreateUserRequest) => {
  const newUser = new UserModel(userData);
  await usersRepo.save(newUser);
  return newUser;
};

export const update = async (userId: string, userData: UpdateTaskRequest) => {
  const user = await findById(userId);
  if (user) user.update(userData);
  return user;
};
