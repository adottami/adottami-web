import { useMemo } from 'react';

import { FCC } from '@/types/react';

import SessionContext, { SessionContextValue } from './session-context';

const SessionContextProvider: FCC = ({ children }) => {
  const session = useMemo<SessionContextValue>(() => ({}), []);

  return <SessionContext.Provider value={session}>{children}</SessionContext.Provider>;
};

export default SessionContextProvider;
