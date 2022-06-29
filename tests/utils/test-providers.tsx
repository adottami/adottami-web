import { QueryClientProvider } from 'react-query';

import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';
import { FCC } from '@/types/react';

import testQueryClient from './test-query-client';

const TestProviders: FCC = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>
    <APIContextProvider>
      <SessionContextProvider>{children}</SessionContextProvider>
    </APIContextProvider>
  </QueryClientProvider>
);

export default TestProviders;
