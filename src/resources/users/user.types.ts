export interface UserRequest {
  id?: string;
  name?: string;
  login?: string;
  password?: string;
}

export interface UserResponse {
  id: string;
  name: string;
  login: string;
}