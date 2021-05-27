const BoardModel = require('./board.model');
const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const findById = (id) => boardsRepo.findById(id);

const remove = async (boardId) => {
  await boardsRepo.remove(boardId);
  tasksService.removeByBoardId(boardId);
};

const save = (boardData) => {
  const newBoard = new BoardModel(boardData);
  boardsRepo.save(newBoard);
  return newBoard;
};

const update = async (boardId, boardData) => {
  const board = await findById(boardId);
  board.update(boardData);
  return board;
};

module.exports = { getAll, remove, save, findById, update };
