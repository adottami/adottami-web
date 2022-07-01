import { useCallback, useMemo, useState } from 'react';

import useAPI from '@/hooks/api/use-api/use-api';
import User from '@/models/user/user';
import { LoginCredentials } from '@/services/adottami-client/session-client/types';
import { FCC } from '@/types/react';

import SessionContext, { SessionContextValue } from './session-context';

const SessionContextProvider: FCC = ({ children }) => {
  const api = useAPI();
  const { setAdottami: setAdottamiClient } = api;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoading(true);

      try {
        const { user, ...authentication } = await api.adottami.session.login(credentials);
        setAdottamiClient(api.adottami.createCopy(authentication));
        setUser(user);
        return user;
      } finally {
        setIsLoading(false);
      }
    },
    [api.adottami, setAdottamiClient],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await api.adottami.session.logout();
      setAdottamiClient(api.adottami.createCopy(null));
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [api.adottami, setAdottamiClient]);

  const session = useMemo<SessionContextValue>(
    () => ({ user, login, logout, isLoading }),
    [user, login, logout, isLoading],
  );

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
