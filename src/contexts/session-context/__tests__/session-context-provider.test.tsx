import { act } from '@testing-library/react';
import { FC } from 'react';

import APIContext, { APIContextValue } from '@/contexts/api-context/api-context';
import createUser from '@/models/user/__tests__/factories/user-factory';
import UserFactory from '@/models/user/user-factory';
import sessionResponseHandler from '@/services/adottami-client/session-client/__tests__/mocks/session-response-handler';
import { LoginCredentials, LoginResponse } from '@/services/adottami-client/session-client/types';
import { renderWithTestProviders } from '@tests/utils/render';

import SessionContext, { SessionContextValue } from '../session-context';
import SessionContextProvider from '../session-context-provider';

describe('Session context provider', () => {
  let session: SessionContextValue;
  let api: APIContextValue;

  const ChildrenComponent: FC = () => {
    session = SessionContext.useContext();
    api = APIContext.useContext();
    return null;
  };

  beforeEach(() => {
    renderWithTestProviders(
      <SessionContextProvider>
        <ChildrenComponent />
      </SessionContextProvider>,
    );
  });

  it('should initialize correctly', () => {
    expect(session.user).toBe(null);
    expect(session.login).toEqual(expect.any(Function));
    expect(session.logout).toEqual(expect.any(Function));
    expect(session.isLoading).toBe(false);
  });

  describe('Session lifecycle', () => {
    const user = createUser();

    const loginResponse: LoginResponse = {
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
      user: UserFactory.toResponse(user),
    };

    const loginCredentials: LoginCredentials = {
      email: 'user@email.com',
      password: 'password',
    };

    it('should support logging in', async () => {
      expect(session.user).toBe(null);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);

      sessionResponseHandler.mockLogin(loginResponse);

      await act(async () => {
        const loggedInUser = await session.login(loginCredentials);
        expect(loggedInUser).toEqual(user);
      });

      expect(session.user).toEqual(user);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(loginResponse.accessToken);
      expect(api.adottami.refreshToken()).toBe(loginResponse.refreshToken);
    });

    it('should support logging out', async () => {
      sessionResponseHandler.mockLogin(loginResponse);

      await act(async () => {
        await session.login(loginCredentials);
      });

      expect(session.user).toEqual(user);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(loginResponse.accessToken);
      expect(api.adottami.refreshToken()).toBe(loginResponse.refreshToken);

      sessionResponseHandler.mockLogout();

      await act(async () => {
        await session.logout();
      });

      expect(session.user).toBe(null);
      expect(session.isLoading).toBe(false);
      expect(api.adottami.accessToken()).toBe(undefined);
      expect(api.adottami.refreshToken()).toBe(undefined);
    });
  });
});
