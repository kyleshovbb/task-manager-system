import { Injectable } from '@nestjs/common';
import { TaskModel } from './tasks.model';

@Injectable()
export class TasksRepository {
  private tasks: TaskModel[];

  constructor() {
    this.tasks = [];
  }

  async getAll() {
    return this.tasks;
  }

  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  async save(task: TaskModel) {
    this.tasks.push(task);
  }

  async removeByTaskId(taskId: string) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  async removeByBoardId(boardId: string) {
    this.tasks = this.tasks.filter((task) => task.boardId !== boardId);
  }

  async unassignUsersById(userId: string) {
    for (const task of this.tasks) {
      if (task.userId === userId) {
        task.userId = null;
      }
    }
  }
}
