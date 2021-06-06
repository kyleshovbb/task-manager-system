import BoardModel from './board.model';
import boardsRepo from './board.memory.repository';
import { removeByBoardId as removeTaskByBoardId } from '../tasks/task.service';
import { CreateBoardRequest, UpdateBoardRequest } from './board.types';

export const getAll = () => boardsRepo.getAll();

export const findById = (id: string) => boardsRepo.findById(id);

export const remove = async (boardId: string) => {
  await boardsRepo.remove(boardId);
  removeTaskByBoardId(boardId);
};

export const save = (boardData: CreateBoardRequest) => {
  const newBoard = new BoardModel(boardData);
  boardsRepo.save(newBoard);
  return newBoard;
};

export const update = async (
  boardId: string,
  boardData: UpdateBoardRequest
) => {
  const board = await findById(boardId);
  if (board) board.update(boardData);
  return board;
};
