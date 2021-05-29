import BoardModel from './board.model';
import tasksService from '../tasks/task.service';
import boardsRepo from './board.memory.repository';

export const getAll = () => boardsRepo.getAll();

export const findById = (id) => boardsRepo.findById(id);

export const remove = async (boardId) => {
  await boardsRepo.remove(boardId);
  tasksService.removeByBoardId(boardId);
};

export const save = (boardData) => {
  const newBoard = new BoardModel(boardData);
  boardsRepo.save(newBoard);
  return newBoard;
};

export const update = async (boardId, boardData) => {
  const board = await findById(boardId);
  board.update(boardData);
  return board;
};
