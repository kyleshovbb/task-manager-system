import TaskModel from './task.model';
import tasksRepo from './task.memory.repository';

export const getAll = () => tasksRepo.getAll();

export const findById = (id) => tasksRepo.findById(id);

export const removeByTaskId = (taskId) => tasksRepo.removeByTaskId(taskId);

export const removeByBoardId = (boardId) => tasksRepo.removeByBoardId(boardId);

export const unassignUsersById = (userId) => tasksRepo.unassignUsersById(userId);

export const save = (taskData, boardId) => {
  const newTask = new TaskModel({ ...taskData, boardId });
  tasksRepo.save(newTask);
  return newTask;
};

export const update = async (taskId, taskData) => {
  const task = await findById(taskId);
  task.update(taskData);
  return task;
};
