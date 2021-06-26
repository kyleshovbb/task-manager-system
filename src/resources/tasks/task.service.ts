import { getCustomRepository } from 'typeorm';
import { TasksRepository } from './task.repository';
import { CreateTaskRequest, UpdateTaskRequest } from './task.types';

export const getAll = () => getCustomRepository(TasksRepository).find();

export const findById = (id: string) =>
  getCustomRepository(TasksRepository).findOne(id);

export const removeByTaskId = (taskId: string) =>
  getCustomRepository(TasksRepository).delete(taskId);

export const removeByBoardId = (boardId: string) =>
  getCustomRepository(TasksRepository).delete({ boardId });

export const unassignUsersById = (userId: string) =>
  getCustomRepository(TasksRepository).unassignUsersById(userId);

export const save = async (taskData: CreateTaskRequest, boardId: string) =>
  getCustomRepository(TasksRepository).createAndSave({
    ...taskData,
    boardId,
  });

export const update = async (taskId: string, taskData: UpdateTaskRequest) =>
  getCustomRepository(TasksRepository).update(taskId, taskData);
