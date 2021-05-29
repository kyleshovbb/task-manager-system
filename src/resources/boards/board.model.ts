import uuid from 'uuid';

export default class Board {
  constructor({ id = uuid.v4(), title = 'TEST_BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  toResponse() {
    return { id: this.id, title: this.title, columns: this.columns };
  }

  update({ title = this.title, columns = this.columns }) {
    this.title = title;
    this.columns = columns;
  }
}
