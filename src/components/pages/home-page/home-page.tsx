import { FC } from 'react';

import InlineLink from '@/components/common/inline-link/inline-link';

import { WELCOME_MESSAGE } from './constants';

const HomePage: FC = () => (
  <>
    <div className="flex h-screen w-screen items-center justify-center bg-surface-primary">
      <h1 className="text-4xl font-bold text-primary-dark">{WELCOME_MESSAGE}</h1>
    </div>
    <InlineLink href="/">Cadastre-se</InlineLink>
  </>
);

export default HomePage;
