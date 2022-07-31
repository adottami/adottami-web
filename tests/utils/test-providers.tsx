import { QueryClientProvider } from 'react-query';

import AccountMenuContextProvider from '@/contexts/account-menu-context/account-menu-context-provider';
import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';
import { FCC } from '@/types/react';

import testQueryClient from './test-query-client';

const TestProviders: FCC = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>
    <AccountMenuContextProvider>
      <APIContextProvider>
        <SessionContextProvider>{children}</SessionContextProvider>
      </APIContextProvider>
    </AccountMenuContextProvider>
  </QueryClientProvider>
);

export default TestProviders;
