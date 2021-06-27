export interface CreateBoardRequest {
  id: string;
  title: string;
  columns: BoardColumn[];
}

export type UpdateBoardRequest = Omit<CreateBoardRequest, 'id'>;

export type BoardResponse = Required<CreateBoardRequest>;

export interface BoardColumn {
  order: number;
  title: string;
}
