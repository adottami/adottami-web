import { FC } from 'react';

import { publicationMock } from '../components/publication-card/mock';
import PublicationCard from '../components/publication-card/publication-card';
import { WELCOME_MESSAGE } from './constants';

const HomePage: FC = () => (
  <>
    <div className="flex h-screen w-screen items-center justify-center bg-surface-primary">
      <h1 className="text-4xl font-bold text-primary-dark">{WELCOME_MESSAGE}</h1>
    </div>
    <PublicationCard publication={publicationMock} />
  </>
);

export default HomePage;
