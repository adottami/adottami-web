export interface AuthenticationCredentials {
  accessToken: string;
  refreshToken: string;
}

export interface AdottamiListeners {
  onUnexpectedLogout?: () => void;
}
