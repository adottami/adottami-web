import { FCC } from '@/types/react';

import APIContext from './api-context';

const APIContextProvider: FCC = ({ children }) => (
  <APIContext.Provider value={undefined}>{children}</APIContext.Provider>
);

export default APIContextProvider;
