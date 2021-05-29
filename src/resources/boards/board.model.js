const uuid = require('uuid');

/** @module BoardModel */

/**
 * @typedef {Object} Column Column in board
 * @property {string} title Column title
 * @property {number} order Column order for sorting
 */

/** Class representing a board */
class Board {
  /**
   * Create board
   * @param {Object} boardData Board data for creating new board
   * @param {string} boardData.id Board id
   * @param {string} boardData.title Board title
   * @param {Array<Column>} boardData.columns Columns in board
   */
  constructor({ id = uuid.v4(), title = 'TEST_BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Get board data for HTTP response
   * @return {Object} Board data
   */
  toResponse() {
    return { id: this.id, title: this.title, columns: this.columns };
  }

  /**
   * Update board data
   * @param {Object} updatedBoard Board data for updating board
   * @param {string} updatedBoard.title Board title
   * @param {Array<Column>} updatedBoard.columns Columns in board
   */
  update({ title = this.title, columns = this.columns }) {
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
