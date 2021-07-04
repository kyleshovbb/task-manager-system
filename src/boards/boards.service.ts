import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TasksService } from '../tasks/tasks.service';
import { BoardEntity } from './board.entity';
import { BoardRequest } from './interfaces/board.interface';

@Injectable()
export class BoardsService {
  constructor(
    private tasksService: TasksService,
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>
  ) {}

  getAll() {
    return this.boardsRepository.find();
  }

  findById(id: string) {
    return this.boardsRepository.findOne(id);
  }

  async remove(boardId: string) {
    return Promise.allSettled([
      this.boardsRepository.delete(boardId),
      this.tasksService.removeByBoardId(boardId),
    ]);
  }

  async save(boardData: BoardRequest) {
    const newBoard = this.boardsRepository.create();
    newBoard.title = boardData.title;
    newBoard.columns = boardData.columns;
    return this.boardsRepository.save(newBoard);
  }

  async update(boardId: string, boardData: BoardRequest) {
    return this.boardsRepository.update(boardId, boardData);
  }
}
