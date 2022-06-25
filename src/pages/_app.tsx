import { AppProps } from 'next/app';
import { FC, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';
import '@/styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <APIContextProvider>
        <SessionContextProvider>
          <Component {...pageProps} />
        </SessionContextProvider>
      </APIContextProvider>
    </QueryClientProvider>
  );
};

export default App;
