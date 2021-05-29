const TaskModel = require('./task.model');
const tasksRepo = require('./task.memory.repository');

/** @module TaskService */

/**
 * Get all tasks
 * @return {Promise<Array<Task>>} All tasks which were created and saved
 */
const getAll = () => tasksRepo.getAll();

/**
 * Find task by task id
 * @param {string} id Task id
 * @return {Promise<Task>} Found created task
 */
const findById = (id) => tasksRepo.findById(id);

/**
 * Remove task by task id
 * @param {string} taskId Task id
 * @return {Promise<void>} Empty promise
 */
const removeByTaskId = (taskId) => tasksRepo.removeByTaskId(taskId);

/**
 * Remove tasks by board id
 * @param {string} boardId Board id
 * @return {Promise<void>} Empty promise
 */
const removeByBoardId = (boardId) => tasksRepo.removeByBoardId(boardId);

/**
 * Unassign tasks by user id
 * @param {string} userId User id
 * @return {Promise<void>} Empty promise
 */
const unassignUsersById = (userId) => tasksRepo.unassignUsersById(userId);

/**
 * Create task by task data and save to tasks repository
 * @async
 * @param {Object} taskData Task data for creating new task
 * @param {string} boardId Board id
 * @return {Promise<Task>} Saved task
 */
const save = async (taskData, boardId) => {
  const newTask = new TaskModel({ ...taskData, boardId });
  await tasksRepo.save(newTask);
  return newTask;
};

/**
 * Update task by updated task data
 * @async
 * @param {string} taskId Task id
 * @param {Object} taskData Task data for updating task
 * @return {Promise<Task>} Updated task
 */
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
