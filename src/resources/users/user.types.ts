export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UserRequest = Omit<IUser, 'id'>;

export type UserResponse = Required<Omit<IUser, 'password'>>;
