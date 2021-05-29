class TasksRepository {
  constructor() {
    this.tasks = [];
  }

  async getAll() {
    return this.tasks;
  }

  async findById(id) {
    return this.tasks.find((task) => task.id === id);
  }

  async save(task) {
    return this.tasks.push(task);
  }

  async removeByTaskId(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  async removeByBoardId(boardId) {
    this.tasks = this.tasks.filter((task) => task.boardId !== boardId);
  }

  async unassignUsersById(userId) {
    for (const task of this.tasks) {
      if (task.userId === userId) {
        task.userId = null;
      }
    }
  }
}

const tasksRepository = new TasksRepository();

export default tasksRepository;
