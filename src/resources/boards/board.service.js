const BoardModel = require('./board.model');
const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const findById = (id) => boardsRepo.findById(id);

const remove = (boardId) => boardsRepo.remove(boardId);

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
