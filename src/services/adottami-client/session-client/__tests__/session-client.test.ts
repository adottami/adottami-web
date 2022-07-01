import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import createUser from '@/models/user/__tests__/factories/user-factory';
import { trackRequests } from '@tests/utils/requests';

import { withBaseAdottamiURL } from '../../utils';
import { ACCESS_TOKEN_ENDPOINT, LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '../constants';
import SessionClient from '../session-client';
import { LoginCredentials, LoginResponse, LoginResult } from '../types';

const baseURL = globalConfig.baseAdottamiURL();

describe('Session client', () => {
  const api = axios.create({ baseURL });
  const sessionClient = new SessionClient(api);

  const loginResult: LoginResult = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: createUser(),
  };

  const loginResponse: LoginResponse = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    user: {
      id: loginResult.user.id(),
      name: loginResult.user.name(),
      email: loginResult.user.email(),
      phoneNumber: loginResult.user.phoneNumber(),
    },
  };

  it('should support logging in', async () => {
    const loginRequests = trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', {
      responseData: loginResponse,
    });

    const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };

    const receivedLoginResult = await sessionClient.login(loginCredentials);

    expect(loginRequests).toHaveLength(1);
    expect(loginRequests[0].body).toEqual(loginCredentials);

    expect(receivedLoginResult).toEqual(loginResult);
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

  it('should notify login listeners on login', async () => {
    const onLogin = jest.fn();
    const sessionClient = new SessionClient(api, { listeners: { onLogin } });

    trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResponse });

    await sessionClient.login({ email: 'user@email.com', password: 'password' });

    expect(onLogin).toHaveBeenCalledWith(loginResult);
  });

  it('should notify logout listeners on logout', async () => {
    const onLogout = jest.fn();
    const sessionClient = new SessionClient(api, { listeners: { onLogout } });

    trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');

    await sessionClient.logout();

    expect(onLogout).toHaveBeenCalled();
  });
});
