export interface CreateBoardRequest {
  id: string;
  title: string;
  columns: Column[];
}

export type UpdateBoardRequest = Omit<CreateBoardRequest, 'id'>;

export type BoardResponse = Required<CreateBoardRequest>;

export interface Column {
  order: number;
  title: string;
}
