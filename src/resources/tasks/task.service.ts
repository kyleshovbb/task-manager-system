import TaskModel from './task.model';
import tasksRepo from './task.memory.repository';
import { CreateTaskRequest, UpdateTaskRequest } from './task.types';

export const getAll = () => tasksRepo.getAll();

export const findById = (id: string) => tasksRepo.findById(id);

export const removeByTaskId = (taskId: string) =>
  tasksRepo.removeByTaskId(taskId);

export const removeByBoardId = (boardId: string) =>
  tasksRepo.removeByBoardId(boardId);

export const unassignUsersById = (userId: string) =>
  tasksRepo.unassignUsersById(userId);

export const save = async (taskData: CreateTaskRequest, boardId: string) => {
  const newTask = new TaskModel({ ...taskData, boardId });
  await tasksRepo.save(newTask);
  return newTask;
};

export const update = async (taskId: string, taskData: UpdateTaskRequest) => {
  const task = await findById(taskId);
  if (task) task.update(taskData);
  return task;
};
