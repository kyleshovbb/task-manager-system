import { Injectable } from '@nestjs/common';

import { BoardModel } from './boards.model';
import { BoardsRepository } from './boards.repository';
import {
  CreateBoardRequest,
  UpdateBoardRequest,
} from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  getAll() {
    return this.boardsRepository.getAll();
  }

  findById(id: string) {
    return this.boardsRepository.findById(id);
  }

  async remove(boardId: string) {
    return Promise.allSettled([this.boardsRepository.remove(boardId)]);
  }

  async save(boardData: CreateBoardRequest) {
    const newBoard = new BoardModel(boardData);
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }

  async update(boardId: string, boardData: UpdateBoardRequest) {
    const board = await this.findById(boardId);
    if (board) board.update(boardData);
    return board;
  }
}
