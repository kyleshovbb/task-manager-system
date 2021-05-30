import Task from './task.model';

class TasksRepository {
  private tasks: Task[];

  constructor() {
    this.tasks = [];
  }

  async getAll() {
    return this.tasks;
  }

  async findById(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  async save(task: Task) {
    return this.tasks.push(task);
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

const tasksRepository = new TasksRepository();

export default tasksRepository;
