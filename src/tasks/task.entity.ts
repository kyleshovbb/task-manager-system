import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { TaskResponse } from './interfaces/task.interface';

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column('uuid', {
    nullable: true,
  })
  userId!: string | null;

  @Column('uuid', {
    nullable: true,
  })
  boardId!: string | null;

  @Column('uuid', {
    nullable: true,
  })
  columnId!: string | null;

  @Column()
  description: string;

  public toResponse(): TaskResponse {
    return {
      id: this.id,
      title: this.title,
      order: this.order,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId,
      description: this.description,
    };
  }
}
