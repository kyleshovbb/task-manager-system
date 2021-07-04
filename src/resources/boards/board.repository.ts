import { EntityRepository, Repository } from 'typeorm';
import Board from './board.entity';
import { CreateBoardRequest } from './board.types';

@EntityRepository(Board)
export class BoardsRepository extends Repository<Board> {
  createAndSave(taskData: CreateBoardRequest) {
    const newTask = this.create();
    newTask.title = taskData.title;
    newTask.columns = taskData.columns;
    return this.save(newTask);
  }
}
