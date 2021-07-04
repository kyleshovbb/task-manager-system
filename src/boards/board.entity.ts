import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardColumn, BoardResponse } from './interfaces/board.interface';

@Entity()
export class BoardEntity extends BaseEntity {
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
