import { FC } from 'react';

import Input from '@/components/common/input/input';

import { WELCOME_MESSAGE } from './constants';

const HomePage: FC = () => (
  <div className="flex h-screen w-screen flex-col items-center justify-center bg-surface-primary">
    <h1 className="text-4xl font-bold text-primary-dark">{WELCOME_MESSAGE}</h1>
    <div className="w-3/5">
      <Input label="E-mail" placeholder="Ex: mathues.silveira@gmail.com" description="Insira seu email" />
    </div>
  </div>
);

export default HomePage;
