import { useCallback, useEffect, useMemo, useState } from 'react';

import useAPI from '@/hooks/api/use-api/use-api';
import User from '@/models/user/user';
import AdottamiClient from '@/services/adottami-client/adottami-client';
import { LoginCredentials } from '@/services/adottami-client/session-client/types';
import { AuthenticationCredentials } from '@/services/adottami-client/types';
import { FCC } from '@/types/react';
import storage from '@/utils/storage-client/storage-client';

import SessionContext, { SessionContextValue } from './session-context';

const SessionContextProvider: FCC = ({ children }) => {
  const api = useAPI();
  const { setAdottami: setAdottamiClient } = api;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    setAdottamiClient(new AdottamiClient(null));
    setUser(null);
    storage.session.clear();
  }, [setAdottamiClient]);

  const createClientsAfterAuthenticated = useCallback(
    (authentication: AuthenticationCredentials) => {
      const adottamiClient = new AdottamiClient(authentication, {
        listeners: { onUnexpectedLogout: clearSession },
      });
      return { adottamiClient };
    },
    [clearSession],
  );

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);

      try {
        const { accessToken, refreshToken, user } = await api.adottami.session.login(credentials);
        const authentication: AuthenticationCredentials = { accessToken, refreshToken };

        const { adottamiClient } = createClientsAfterAuthenticated(authentication);
        setAdottamiClient(adottamiClient);
        setUser(user);
        storage.session.save({ userId: user.id(), authentication });

        return user;
      } finally {
        setIsLoading(false);
      }
    },
    [api.adottami.session, createClientsAfterAuthenticated, setAdottamiClient],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await api.adottami.session.logout();
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [api.adottami.session, clearSession]);

  useEffect(() => {
    async function restorePreviousSessionIfPresent() {
      setIsLoading(true);

      try {
        const sessionData = storage.session.read();
        if (!sessionData) return;

        const { adottamiClient } = createClientsAfterAuthenticated(sessionData.authentication);
        const user = await adottamiClient.users.getById(sessionData.userId);

        setAdottamiClient(adottamiClient);
        setUser(user);
      } catch (error) {
        console.error(error);
        clearSession();
      } finally {
        setIsLoading(false);
      }
    }

    restorePreviousSessionIfPresent();
  }, [createClientsAfterAuthenticated, clearSession, setAdottamiClient]);

  const session = useMemo<SessionContextValue>(
    () => ({ user, login, logout, isLoading }),
    [user, login, logout, isLoading],
  );

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
