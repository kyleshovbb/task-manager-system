import { Injectable } from '@nestjs/common';

import { TaskModel } from './tasks.model';
import { TasksRepository } from './tasks.repository';
import {
  CreateTaskRequest,
  UpdateTaskRequest,
} from './interfaces/task.interface';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getAll() {
    return this.tasksRepository.getAll();
  }

  findById(id: string) {
    return this.tasksRepository.findById(id);
  }

  async removeByTaskId(taskId: string) {
    return this.tasksRepository.removeByTaskId(taskId);
  }

  async removeByBoardId(boardId: string) {
    return this.tasksRepository.removeByBoardId(boardId);
  }

  async unassignUsersById(userId: string) {
    return this.tasksRepository.unassignUsersById(userId);
  }

  async save(taskData: CreateTaskRequest, boardId: string) {
    const newTask = new TaskModel({ ...taskData, boardId });
    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async update(taskId: string, taskData: UpdateTaskRequest) {
    const task = await this.findById(taskId);
    if (task) task.update(taskData);
    return task;
  }
}
