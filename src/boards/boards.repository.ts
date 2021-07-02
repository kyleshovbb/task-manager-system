import { Injectable } from '@nestjs/common';
import { BoardModel } from './boards.model';

@Injectable()
export class BoardsRepository {
  private boards: BoardModel[];

  constructor() {
    this.boards = [];
  }

  async getAll() {
    return this.boards;
  }

  async findById(id: string) {
    return this.boards.find((board) => board.id === id);
  }

  async save(board: BoardModel) {
    this.boards.push(board);
  }

  async remove(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}
