import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from './constants';
import { RequestAccessTokenResult, LoginCredentials, LoginResult } from './types';

class SessionClient {
  constructor(private api: AxiosInstance) {}

  async login(credentials: LoginCredentials): Promise<LoginResult> {
    const { data: loginResult } = await this.api.post<LoginResult>(LOGIN_ENDPOINT, credentials);
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
  }
}

export default SessionClient;
