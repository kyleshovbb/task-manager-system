/** @module BoardMemoryRepository */

/** Class representing boards repository */
class BoardsRepository {
  /**
   * Create boards repository
   */
  constructor() {
    this.boards = [];
  }

  /**
   * Get all boards
   * @async
   * @return {Promise<Array<Board>>} All boards which were created and saved
   */
  async getAll() {
    return this.boards;
  }

  /**
   * Find board by board id
   * @async
   * @param {string} id Board id
   * @return {Promise<Board>} Found board
   */
  async findById(id) {
    return this.boards.find((board) => board.id === id);
  }

  /**
   * Save new board
   * @async
   * @param {Board} board Saved board
   * @return {Promise<void>} Empty promise
   */
  async save(board) {
    this.boards.push(board);
  }

  /**
   * Remove board by board id
   * @async
   * @param {string} id Board id
   * @return {Promise<void>} Empty promise
   */
  async remove(id) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}

module.exports = new BoardsRepository();
