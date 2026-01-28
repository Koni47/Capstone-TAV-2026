import api from "../lib/axios";
import { LoginCredentials, LoginResponse, RegisterDTO, UserPayload } from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<any>("/auth/login", credentials);
    // El backend devuelve { accessToken, refreshToken, user }
    const { accessToken, refreshToken, user } = response.data;
    return { token: accessToken, user } as LoginResponse;
  },

  register: async (data: RegisterDTO): Promise<UserPayload> => {
    const response = await api.post<UserPayload>("/auth/register", data);
    return response.data;
  },

  getProfile: async (): Promise<UserPayload> => {
    const response = await api.get<UserPayload>("/auth/profile");
    return response.data;
  },
};
