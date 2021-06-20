import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn, BoardResponse } from './board.types';

@Entity()
export default class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('jsonb')
  columns: BoardColumn[];

  toResponse(): BoardResponse {
    return { id: this.id, title: this.title, columns: this.columns };
  }
}
