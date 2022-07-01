import { act } from '@testing-library/react';
import { FC } from 'react';

import AdottamiClient from '@/services/adottami-client/adottami-client';
import { LOGIN_ENDPOINT, LOGOUT_ENDPOINT } from '@/services/adottami-client/session-client/constants';
import { LoginCredentials, LoginResult } from '@/services/adottami-client/session-client/types';
import { withBaseAdottamiURL } from '@/services/adottami-client/utils';
import { renderWithTestProviders } from '@tests/utils/render';
import { trackRequests } from '@tests/utils/requests';

import APIContext, { APIContextValue } from '../api-context';
import APIContextProvider from '../api-context-provider';

describe('API context provider', () => {
  let api: APIContextValue;

  const ChildrenComponent: FC = () => {
    api = APIContext.useContext();
    return null;
  };

  beforeEach(() => {
    renderWithTestProviders(
      <APIContextProvider>
        <ChildrenComponent />
      </APIContextProvider>,
    );
  });

  it('should initialize correctly', () => {
    expect(api.adottami).toBeInstanceOf(AdottamiClient);
  });

  describe('Adottami client', () => {
    const loginCredentials: LoginCredentials = { email: 'user@email.com', password: 'password' };
    const loginResult: LoginResult = { accessToken: 'access-token', refreshToken: 'refresh-token' };

    it('should update the adottami client on state after login', async () => {
      const initialAdottamiClient = api.adottami;
      expect(initialAdottamiClient.accessToken()).toBe(undefined);
      expect(initialAdottamiClient.refreshToken()).toBe(undefined);

      trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResult });
      await act(async () => {
        await api.adottami.login(loginCredentials);
      });

      expect(api.adottami).not.toBe(initialAdottamiClient);
      expect(api.adottami.accessToken()).toBe(loginResult.accessToken);
      expect(api.adottami.refreshToken()).toBe(loginResult.refreshToken);
    });

    it('should update the adottami client on state after logout', async () => {
      trackRequests(withBaseAdottamiURL(LOGIN_ENDPOINT), 'post', { responseData: loginResult });
      await act(async () => {
        await api.adottami.login(loginCredentials);
      });

      const initialAdottamiClient = api.adottami;
      expect(initialAdottamiClient.accessToken()).toBe(loginResult.accessToken);
      expect(initialAdottamiClient.refreshToken()).toBe(loginResult.refreshToken);

      trackRequests(withBaseAdottamiURL(LOGOUT_ENDPOINT), 'post');
      await act(async () => {
        await api.adottami.logout();
      });

      expect(api.adottami).not.toBe(initialAdottamiClient);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);
    });
  });
});
