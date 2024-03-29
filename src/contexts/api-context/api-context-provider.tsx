import { useMemo, useState } from 'react';

import AdottamiClient from '@/services/adottami-client/adottami-client';
import { FCC } from '@/types/react';

import APIContext, { APIContextValue } from './api-context';

const APIContextProvider: FCC = ({ children }) => {
  const [adottamiClient, setAdottamiClient] = useState<AdottamiClient>(() => new AdottamiClient(null));

  const api = useMemo<APIContextValue>(
    () => ({ adottami: adottamiClient, setAdottami: setAdottamiClient }),
    [adottamiClient],
  );

  return <APIContext.Provider value={api}>{children}</APIContext.Provider>;
};

export default APIContextProvider;
