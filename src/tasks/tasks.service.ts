import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskRequest } from './interfaces/task.interface';
import { TaskEntity } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>
  ) {}

  getAll() {
    return this.tasksRepository.find();
  }

  findById(id: string) {
    return this.tasksRepository.findOne(id);
  }

  async removeByTaskId(taskId: string) {
    return this.tasksRepository.delete(taskId);
  }

  async removeByBoardId(boardId: string) {
    return this.tasksRepository.delete({ boardId });
  }

  async unassignUsersById(userId: string) {
    return this.tasksRepository.update({ userId }, { userId: null });
  }

  async save(taskData: TaskRequest, boardId: string) {
    const newTask = this.tasksRepository.create();
    newTask.title = taskData.title;
    newTask.order = taskData.order;
    newTask.userId = taskData.userId;
    newTask.boardId = boardId;
    newTask.columnId = taskData.columnId;
    newTask.description = taskData.description;
    return this.tasksRepository.save(newTask);
  }

  async update(taskId: string, taskData: TaskRequest) {
    return this.tasksRepository.update(taskId, taskData);
  }
}
