interface Board {
  id: string;
  title: string;
  columns: BoardColumn[];
}

export type BoardRequest = Omit<Board, 'id'>;

export type BoardResponse = Board;

export interface BoardColumn {
  order: number;
  title: string;
}
