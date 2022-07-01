import { UserResponse } from '@/models/user/types';
import User from '@/models/user/user';

export interface SessionListeners {
  onLogin?: (loginResult: LoginResult) => void;
  onLogout?: () => void;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface RequestAccessTokenResult {
  accessToken: string;
}
