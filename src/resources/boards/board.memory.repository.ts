import Board from './board.model';

class BoardsRepository {
  private boards: Board[];

  constructor() {
    this.boards = [];
  }

  async getAll() {
    return this.boards;
  }

  async findById(id: string) {
    return this.boards.find((board) => board.id === id);
  }

  async save(board: Board) {
    this.boards.push(board);
  }

  async remove(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}

const boardsRepository = new BoardsRepository();

export default boardsRepository;
