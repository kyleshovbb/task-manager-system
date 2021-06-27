import { EntityRepository, Repository } from 'typeorm';
import Task from './task.entity';
import { CreateTaskRequest } from './task.types';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  createAndSave(taskData: CreateTaskRequest) {
    const newTask = this.create();
    newTask.title = taskData.title;
    newTask.order = taskData.order;
    newTask.userId = taskData.userId;
    newTask.boardId = taskData.boardId;
    newTask.columnId = taskData.columnId;
    newTask.description = taskData.description;
    return this.save(newTask);
  }

  async unassignUsersById(userId: string) {
    return this.update({ userId }, { userId: null });
  }
}
