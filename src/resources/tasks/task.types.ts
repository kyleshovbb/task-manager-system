export interface TaskRequest {
  id?: string;
  title?: string;
  order?: number;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
  description?: string;
}

export interface TaskResponse {
  id: string;
  title: string;
  order: number;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
  description: string;
}

export interface CreateRouterParams {
  boardId: string;
  [key: string]: string;
}
