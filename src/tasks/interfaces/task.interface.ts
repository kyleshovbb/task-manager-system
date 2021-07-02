export interface CreateTaskRequest {
  id: string;
  title: string;
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description: string;
}

export type UpdateTaskRequest = Omit<CreateTaskRequest, 'id'>;

export type TaskResponse = Required<CreateTaskRequest>;

export interface CreateRouterParams {
  boardId: string;
  [key: string]: string;
}
