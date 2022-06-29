import { useMemo } from 'react';

import { FCC } from '@/types/react';

import APIContext, { APIContextValue } from './api-context';

const APIContextProvider: FCC = ({ children }) => {
  const api = useMemo<APIContextValue>(() => ({}), []);

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};

export default APIContextProvider;
