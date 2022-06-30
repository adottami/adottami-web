import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import { trackRequests } from '@tests/utils/requests';

import { withBaseAdottamiURL } from '../../utils';
import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '../constants';
import SessionClient from '../session-client';
import { LoginCredentials, LoginResult } from '../types';

const baseURL = globalConfig.baseAdottamiURL();

describe('Session client', () => {
  const sessionClient = new SessionClient(axios.create({ baseURL }));

  it('should support logging in', async () => {
    const expectedLoginResult: LoginResult = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    };

    const loginRequests = trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', {
      responseData: expectedLoginResult,
    });

    const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };

    const loginResult = await sessionClient.login(loginCredentials);

    expect(loginRequests).toHaveLength(1);
    expect(loginRequests[0].body).toEqual(loginCredentials);

    expect(loginResult).toEqual(expectedLoginResult);
  });

  it('should support requesting a new access token', async () => {
    const refreshToken = 'refresh-token';
    const expectedAccessToken = 'access-token';

    const requestAccessTokenRequests = trackRequests(withBaseAdottamiURL(ACCESS_TOKEN_ENDPOINT), 'post', {
      responseData: { accessToken: expectedAccessToken },
    });

    const accessToken = await sessionClient.requestAccessToken(refreshToken);

    expect(requestAccessTokenRequests).toHaveLength(1);
    expect(requestAccessTokenRequests[0].body).toEqual({ refreshToken });

    expect(accessToken).toEqual(expectedAccessToken);
  });

  it('should correctly indicate if a config matches a request access token config', () => {
    expect(sessionClient.matchesRequestAccessTokenConfig({ url: `/${ACCESS_TOKEN_ENDPOINT}` })).toBe(true);
    expect(sessionClient.matchesRequestAccessTokenConfig({ url: `/${ACCESS_TOKEN_ENDPOINT}/some` })).toBe(false);
    expect(sessionClient.matchesRequestAccessTokenConfig({ url: `/api` })).toBe(false);
  });

  it('should support logging out', async () => {
    const logoutRequests = trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');

    await sessionClient.logout();

    expect(logoutRequests).toHaveLength(1);
    expect(logoutRequests[0].body).toEqual('');
  });
});
