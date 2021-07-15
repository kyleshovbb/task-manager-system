interface Task {
  id: string;
  title: string;
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description: string;
}

export type TaskRequest = Omit<Task, 'id'>;

export type TaskResponse = Task;
