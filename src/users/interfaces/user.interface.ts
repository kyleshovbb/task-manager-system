export interface CreateUserRequest {
  id: string;
  name: string;
  login: string;
  password: string;
}

export type UpdateUserRequest = Omit<CreateUserRequest, 'id'>;

export type UserResponse = Required<Omit<CreateUserRequest, 'password'>>;
