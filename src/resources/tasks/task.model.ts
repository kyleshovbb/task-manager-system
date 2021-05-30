import { v4 } from 'uuid';
import { TaskRequest, TaskResponse } from './task.types';

export default class Task {
  public id: string;

  public title: string;

  public order: number;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  public description: string;

  constructor({
    id = v4(),
    title = 'TEST_TASK_TITLE',
    order = 0,
    userId = null,
    boardId = 'test',
    columnId = null,
    description = 'TEST_DESCRIPTION',
  }: TaskRequest = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
  }

  toResponse(): TaskResponse {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
      description: this.description,
    };
  }

  update({
    id = this.id,
    title = this.title,
    order = this.order,
    userId = this.userId,
    boardId = this.boardId,
    columnId = this.columnId,
    description = this.description,
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
    this.description = description;
  }
}
