import { getCustomRepository } from 'typeorm';
import { UsersRepository } from './user.memory.repository';
import { unassignUsersById } from '../tasks/task.service';
import { CreateUserRequest, UpdateTaskRequest } from './user.types';

export const getAll = () => getCustomRepository(UsersRepository).getAll();

export const findById = (id: string) =>
  getCustomRepository(UsersRepository).findById(id);

export const remove = async (userId: string) =>
  Promise.allSettled([
    getCustomRepository(UsersRepository).removeById(userId),
    unassignUsersById(userId),
  ]);

export const save = async (userData: CreateUserRequest) =>
  getCustomRepository(UsersRepository).createAndSave(userData);

export const update = async (userId: string, userData: UpdateTaskRequest) =>
  getCustomRepository(UsersRepository).update(userId, userData);
