export interface JwtPayload {
  userId: string;
  login: string;
}

export interface AuthRequest {
  login: string;
  password: string;
}
