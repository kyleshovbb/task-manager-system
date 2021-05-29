class BoardsRepository {
  constructor() {
    this.boards = [];
  }

  async getAll() {
    return this.boards;
  }

  async findById(id) {
    return this.boards.find((board) => board.id === id);
  }

  async save(board) {
    return this.boards.push(board);
  }

  async remove(id) {
    this.boards = this.boards.filter((board) => board.id !== id);
  }
}

export default new BoardsRepository();
