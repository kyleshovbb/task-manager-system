import uuid from 'uuid';

import { UserRequest, UserResponse } from './user.types';

export default class User {
  public id: string;

  public name: string;

  public login: string;

  public password: string;

  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: UserRequest = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  public toResponse(): UserResponse {
    return { id: this.id, name: this.name, login: this.login };
  }

  public update({
    name = this.name,
    login = this.login,
    password = this.password,
  }) {
    this.name = name;
    this.login = login;
    this.password = password;
  }
}
