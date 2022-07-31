import { AxiosInstance, AxiosRequestConfig } from 'axios';

import UserFactory from '@/models/user/user-factory';

import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from './constants';
import { RequestAccessTokenResult, LoginCredentials, LoginResult, LoginResponse, SessionListeners } from './types';

class SessionClient {
  private listeners: SessionListeners;

  constructor(private api: AxiosInstance, options: { listeners?: SessionListeners } = {}) {
    this.listeners = options.listeners ?? {};
  }

  async login(credentials: LoginCredentials): Promise<LoginResult> {
    const { data: loginResponse } = await this.api.post<LoginResponse>(LOGIN_ENDPOINT, credentials);

    const loginResult = {
      accessToken: loginResponse.accessToken,
      refreshToken: loginResponse.refreshToken,
      user: UserFactory.createFromResponse(loginResponse.user),
    };

    this.listeners.onLogin?.(loginResult);

    return loginResult;
  }

  async requestAccessToken(refreshToken: string): Promise<string> {
    const {
      data: { accessToken },
    } = await this.api.post<RequestAccessTokenResult>(ACCESS_TOKEN_ENDPOINT, { refreshToken });
    return accessToken;
  }

  matchesRequestAccessTokenConfig(config: AxiosRequestConfig): boolean {
    return !!config.url?.endsWith(ACCESS_TOKEN_ENDPOINT);
  }

  async logout() {
    await this.api.post<RequestAccessTokenResult>(LOGOUT_ENDPOINT);

    this.listeners.onLogout?.();
  }
}

export default SessionClient;
