import { v4 } from 'uuid';

import {
  Column,
  BoardResponse,
  UpdateBoardRequest,
  CreateBoardRequest,
} from './interfaces/board.interface';

export class BoardModel {
  public id: string;

  public title: string;

  public columns: Column[];

  constructor({
    id = v4(),
    title = 'TEST_BOARD',
    columns = [],
  }: CreateBoardRequest) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  toResponse(): BoardResponse {
    return { id: this.id, title: this.title, columns: this.columns };
  }

  update({ title = this.title, columns = this.columns }: UpdateBoardRequest) {
    this.title = title;
    this.columns = columns;
  }
}
