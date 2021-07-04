import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TaskRequest } from './interfaces/task.interface';

import { TasksService } from './tasks.service';

@Controller('boards/:boardId/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async findAll() {
    const tasks = await this.tasksService.getAll();
    return tasks.map((task) => task.toResponse());
  }

  @Post()
  async create(@Body() body: TaskRequest, @Param('boardId') boardId: string) {
    const newTask = await this.tasksService.save(body, boardId);
    return newTask.toResponse();
  }

  @Get(':taskId')
  async findOne(@Param('taskId') taskId: string) {
    const task = await this.tasksService.findById(taskId);

    if (task) {
      return task.toResponse();
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Put(':taskId')
  async update(@Body() body: TaskRequest, @Param('taskId') taskId: string) {
    const task = await this.tasksService.update(taskId, body);

    if (task) {
      return task;
    }

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':taskId')
  async delete(@Param('taskId') taskId: string) {
    await this.tasksService.removeByTaskId(taskId);
  }
}
