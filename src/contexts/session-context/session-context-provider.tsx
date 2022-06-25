import { FCC } from '@/types/react';

import SessionContext from './session-context';

const SessionContextProvider: FCC = ({ children }) => (
  <SessionContext.Provider value={undefined}>{children}</SessionContext.Provider>
);

export default SessionContextProvider;
