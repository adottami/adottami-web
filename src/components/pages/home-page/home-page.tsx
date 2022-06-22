import { FC } from 'react';

import { WELCOME_MESSAGE } from './constants';

const HomePage: FC = () => (
  <div className="flex h-screen w-screen items-center justify-center bg-blue-50">
    <h1 className="text-4xl font-medium">{WELCOME_MESSAGE}</h1>
  </div>
);

export default HomePage;
