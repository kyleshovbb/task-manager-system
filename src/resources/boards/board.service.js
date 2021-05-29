const BoardModel = require('./board.model');
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

/** @module BoardService */

/**
 * Get all boards
 * @return {Promise<Array<Board>>} All boards which were created and saved in boards repository
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get one board found by board id
 * @param {string} id Board id
 * @return {Promise<Board>} Found created board
 */
const findById = (id) => boardsRepo.findById(id);

/**
 * Remove board and tasks by board id
 * @async
 * @param {string} boardId Board id
 * @return {Promise<void>} Empty promise
 */
const remove = async (boardId) => {
  await boardsRepo.remove(boardId);
  tasksService.removeByBoardId(boardId);
};

/**
 * Create board by board data and save to boards repository
 * @async
 * @param {Object} boardData Board data for creating new board
 * @return {Promise<Board>} Saved board
 */
const save = async (boardData) => {
  const newBoard = new BoardModel(boardData);
  await boardsRepo.save(newBoard);
  return newBoard;
};

/**
 * Update board by updated board data
 * @async
 * @param {Object} boardId Board id
 * @param {Object} boardData Board data for updating board
 * @return {Promise<Board>} Updated board
 */
const update = async (boardId, boardData) => {
  const board = await findById(boardId);
  board.update(boardData);
  return board;
};

module.exports = { getAll, remove, save, findById, update };
