import axios, { AxiosError, AxiosInstance } from 'axios';

import globalConfig from '@/config/global-config/global-config';

import { HTTPResponseCode } from '../types';
import PublicationClient from './publication-client/publication-client';
import SessionClient from './session-client/session-client';
import { AuthenticationCredentials } from './types';
import UserClient from './user-client/user-client';

class AdottamiClient {
  private api: AxiosInstance;
  private authentication: AuthenticationCredentials | null;

  session: SessionClient;
  users: UserClient;
  publications: PublicationClient;

  constructor(authentication: AuthenticationCredentials | null) {
    this.authentication = authentication;

    const baseURL = globalConfig.baseAdottamiURL();
    this.api = this.createAPIInstance(baseURL);

    this.session = this.createSessionClient();
    this.users = new UserClient(this.api);
    this.publications = new PublicationClient(this.api);
  }

  private createAPIInstance(baseURL: string): AxiosInstance {
    const api = axios.create({ baseURL });

    if (this.authentication) {
      api.defaults.headers.common.authorization = `Bearer ${this.authentication.accessToken}`;
    }
    this.registerAPIResponseErrorHandler(api);

    return api;
  }

  private registerAPIResponseErrorHandler(api: AxiosInstance) {
    api.interceptors.response.use(
      (response) => response,
      async (error: unknown) => {
        if (!(error instanceof AxiosError)) return Promise.reject(error);
        return this.handleAPIResponseError(api, error);
      },
    );
  }

  private async handleAPIResponseError(api: AxiosInstance, error: AxiosError) {
    const isUnauthorizedError = error.response?.status === HTTPResponseCode.UNAUTHORIZED;
    const isRequestAccessTokenError = this.session.matchesRequestAccessTokenConfig(error.config);

    if (!isUnauthorizedError || isRequestAccessTokenError || this.authentication === null) {
      return Promise.reject(error);
    }

    const newAccessToken = await this.session.requestAccessToken(this.authentication.refreshToken);
    this.authentication.accessToken = newAccessToken;

    const newAuthorizationHeader = `Bearer ${this.authentication.accessToken}`;
    api.defaults.headers.common.authorization = newAuthorizationHeader;

    if (error.config.headers) {
      error.config.headers.authorization = newAuthorizationHeader;
    } else {
      error.config.headers = { authorization: newAuthorizationHeader };
    }

    return api(error.config);
  }

  private createSessionClient(): SessionClient {
    return new SessionClient(this.api, {
      listeners: {
        onLogin: ({ accessToken, refreshToken }) => {
          this.authentication = { accessToken, refreshToken };
        },
        onLogout: () => {
          this.authentication = null;
        },
      },
    });
  }

  baseURL(): string | undefined {
    return this.api.defaults.baseURL;
  }

  accessToken(): string | undefined {
    return this.authentication?.accessToken;
  }

  refreshToken(): string | undefined {
    return this.authentication?.refreshToken;
  }
}

export default AdottamiClient;
