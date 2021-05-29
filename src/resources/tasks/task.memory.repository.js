/** @module TaskMemoryRepository */

/** Class representing tasks repository */
class TasksRepository {
  /**
   * Create tasks repository
   */
  constructor() {
    this.tasks = [];
  }

  /**
   * Get all tasks
   * @async
   * @return {Promise<Array<Task>>} All tasks which were created and saved
   */
  async getAll() {
    return this.tasks;
  }

  /**
   * Find task by task id
   * @async
   * @param {string} id Task id
   * @return {Promise<Task>} Found task
   */
  async findById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  /**
   * Save new task
   * @async
   * @param {Task} task Saved task
   * @return {Promise<void>} Empty promise
   */
  async save(task) {
    this.tasks.push(task);
  }

  /**
   * Remove task by task id
   * @async
   * @param {string} taskId Task id
   * @return {Promise<void>} Empty promise
   */
  async removeByTaskId(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  /**
   * Remove tasks by board id
   * @async
   * @param {string} boardId Board id
   * @return {Promise<void>} Empty promise
   */
  async removeByBoardId(boardId) {
    this.tasks = this.tasks.filter((task) => task.boardId !== boardId);
  }

  /**
   * Unassign tasks by user id
   * @async
   * @param {string} userId User id
   * @return {Promise<void>} Empty promise
   */
  async unassignUsersById(userId) {
    for (const task of this.tasks) {
      if (task.userId === userId) {
        task.userId = null;
      }
    }
  }
}

module.exports = new TasksRepository();
