import { FC, ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';

import testQueryClient from './test-query-client';

const TestProviders: FC<{ children?: ReactNode }> = ({ children }) => (
  <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
);

export default TestProviders;
