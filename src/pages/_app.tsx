import { AppProps } from 'next/app';
import { FC, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import APIContextProvider from '@/contexts/api-context/api-context-provider';
import SessionContextProvider from '@/contexts/session-context/session-context-provider';

import '@/styles/global.css';
import 'react-toastify/dist/ReactToastify.min.css';
import MenuContextProvider from '@/contexts/account-menu-context/account-menu-context-provider';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <MenuContextProvider>
        <APIContextProvider>
          <SessionContextProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </SessionContextProvider>
        </APIContextProvider>
      </MenuContextProvider>
    </QueryClientProvider>
  );
};

export default App;
