import { AppProps } from 'next/app';
import { FC, useRef } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/global.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const queryClient = useRef(new QueryClient()).current;

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default App;
