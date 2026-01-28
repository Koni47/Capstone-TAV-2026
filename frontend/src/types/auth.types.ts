export enum UserRole {
  ADMIN = "ADMIN",
  DRIVER = "DRIVER",
  CLIENT = "CLIENT",
}

export interface UserPayload {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
}

export interface LoginResponse {
  token: string;
  user: UserPayload;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterDTO {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
}
