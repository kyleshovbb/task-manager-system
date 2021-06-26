import { getCustomRepository } from 'typeorm';
import { UserRequest } from './user.types';
import { UsersRepository } from './user.memory.repository';
import { unassignUsersById } from '../tasks/task.service';

export const getAll = () => getCustomRepository(UsersRepository).find();

export const findById = (id: string) =>
  getCustomRepository(UsersRepository).findOne(id);

export const findByLogin = (login: string) =>
  getCustomRepository(UsersRepository).findOne({ login });

export const remove = async (userId: string) =>
  Promise.allSettled([
    getCustomRepository(UsersRepository).delete(userId),
    unassignUsersById(userId),
  ]);

export const save = async (userData: UserRequest) =>
  getCustomRepository(UsersRepository).createAndSave(userData);

export const update = async (userId: string, userData: UserRequest) =>
  getCustomRepository(UsersRepository).update(userId, userData);
