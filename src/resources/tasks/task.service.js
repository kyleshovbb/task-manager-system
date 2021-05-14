const TaskModel = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const findById = (id) => tasksRepo.findById(id);

const removeByTaskId = (taskId) => tasksRepo.removeByTaskId(taskId);

const removeByBoardId = (boardId) => tasksRepo.removeByBoardId(boardId);

const unassignUsersById = (userId) => tasksRepo.unassignUsersById(userId);

const save = (taskData, boardId) => {
  const newTask = new TaskModel({ ...taskData, boardId });
  tasksRepo.save(newTask);
  return newTask;
};

const update = async (taskId, taskData) => {
  const task = await findById(taskId);
  task.update(taskData);
  return task;
};

module.exports = {
  getAll,
  findById,
  removeByTaskId,
  removeByBoardId,
  unassignUsersById,
  save,
  update,
};
