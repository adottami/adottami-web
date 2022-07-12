import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';

import { homePageTestIds, SLOGAN_MESSAGE } from './constants';

const HomePage: FC = () => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-surface-primary">
    <section className="flex h-screen w-full px-6 py-12 sm:items-center sm:justify-center md:px-12 md:py-20 lg:px-24 lg:py-40">
      <div className="flex w-full flex-col sm:w-1/2">
        <h1 className="text-2xl font-bold text-primary-dark sm:text-3xl lg:text-4xl">{SLOGAN_MESSAGE}</h1>
        <p className="text-md text-primary-dark lg:text-lg" data-testid={homePageTestIds.firstSection.description()}>
          Oferecemos uma plataforma de adoção e simples, prática e agradável para facilitar a adoção e anúncio de
          animais vivendo em situações precarias.
        </p>
        <div className="mt-6 flex items-center gap-6 tablet:mt-8">
          <Button data-testid={homePageTestIds.firstSection.button()}>Adotar um pet</Button>
          <InlineLink href="" rightIcon>
            Saiba mais
          </InlineLink>
        </div>
      </div>
      <div className="relative hidden h-full w-1/2 tablet:flex">
        <Image
          src="/images/decorative-image.png"
          alt="Seção decorativa"
          layout="fill"
          objectFit="contain"
          data-testid={homePageTestIds.firstSection.decorativeImage()}
        />
      </div>
    </section>
  </div>
);

export default HomePage;
