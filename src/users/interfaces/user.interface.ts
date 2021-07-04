export type UserRequest = Omit<User, 'id'>;

export type UserResponse = Required<Omit<User, 'password'>>;

interface User {
  id: string;
  name: string;
  login: string;
  password: string;
}
