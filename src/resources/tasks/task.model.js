const uuid = require('uuid');

/** @module TaskModel */

/** Class representing a task */
class Task {
  /**
   * Create task
   * @param {Object} taskData Task data for creating new task
   * @param {string} taskData.id Task id
   * @param {string} taskData.title Task title
   * @param {number} taskData.order Task order for sorting
   * @param {string} taskData.userId User id to bind task with user
   * @param {string} taskData.boardId Board id to bind task with board
   * @param {string} taskData.columnId Column id to bind task with column
   * @param {string} taskData.description Task description
   */
  constructor({
    id = uuid.v4(),
    title = 'TEST_TASK_TITLE',
    order = 0,
    userId = null,
    boardId = 'test',
    columnId = null,
    description = 'TEST_DESCRIPTION',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
  }

  /**
   * Get task data for HTTP response
   * @return {Object} Task data
   */
  toResponse() {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
      description: this.description,
    };
  }

  /**
   * Update task data
   * @param {Object} taskData Task data for updating task
   * @param {string} taskData.title Task title
   * @param {number} taskData.order Task order for sorting
   * @param {string} taskData.userId User id to bind task with user
   * @param {string} taskData.boardId Board id to bind task with board
   * @param {string} taskData.columnId Column id to bind task with column
   * @param {string} taskData.description Task description
   */
  update({
    title = this.title,
    order = this.order,
    userId = this.userId,
    boardId = this.boardId,
    columnId = this.columnId,
    description = this.description,
  }) {
    this.title = title;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
  }
}

module.exports = Task;
