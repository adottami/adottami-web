export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
}

export interface RequestAccessTokenResult {
  accessToken: string;
}
