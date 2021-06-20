import { getCustomRepository } from 'typeorm';
import { BoardsRepository } from './board.memory.repository';
import { removeByBoardId as removeTaskByBoardId } from '../tasks/task.service';
import { CreateBoardRequest, UpdateBoardRequest } from './board.types';

export const getAll = () => getCustomRepository(BoardsRepository).find();

export const findById = (id: string) =>
  getCustomRepository(BoardsRepository).findOne(id);

export const remove = (boardId: string) =>
  Promise.allSettled([
    getCustomRepository(BoardsRepository).delete(boardId),
    removeTaskByBoardId(boardId),
  ]);

export const save = async (boardData: CreateBoardRequest) =>
  getCustomRepository(BoardsRepository).createAndSave(boardData);

export const update = async (boardId: string, boardData: UpdateBoardRequest) =>
  getCustomRepository(BoardsRepository).update(boardId, boardData);
