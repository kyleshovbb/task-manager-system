import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { UserResponse } from './user.types';

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  public toResponse(): UserResponse {
    return { id: this.id, name: this.name, login: this.login };
  }
}
