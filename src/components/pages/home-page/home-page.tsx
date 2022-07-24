import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Page from '@/components/common/page/page';
import Header from '@/components/pages/components/header/header';

import {
  FIRST_DESCRIPTION_OF_HOW_IT_WORKS,
  homePageTestIds,
  HOW_ADOTTAMI_WORKS,
  PAGE_TITLE,
  SECOND_DESCRIPTION_OF_HOW_IT_WORKS,
  SLOGAN_MESSAGE,
  THIRD_DESCRIPTION_OF_HOW_IT_WORKS,
} from './constants';

const HomePage: FC = () => (
  <Page title={PAGE_TITLE}>
    <Header />
    <div className="flex h-full w-full flex-col items-center justify-center bg-surface-primary">
      <section className="flex h-full w-full px-6 py-12 sm:items-center sm:justify-center md:gap-6 md:px-12 md:py-20 lg:px-24 lg:py-40 tablet:h-screen">
        <div className="flex w-full flex-col sm:w-1/2">
          <h1 className="text-2xl font-bold leading-none text-primary-dark sm:text-3xl lg:text-4xl">
            {SLOGAN_MESSAGE}
          </h1>
          <p
            className="mt-2 text-md text-primary-dark sm:mt-4 lg:text-lg"
            data-testid={homePageTestIds.firstSection.description()}
          >
            Oferecemos uma plataforma de adoção e simples, prática e agradável para facilitar a adoção e anúncio de
            animais vivendo em situações precarias.
          </p>
          <div className="mt-6 flex items-center gap-6 tablet:mt-8">
            <Button data-testid={homePageTestIds.firstSection.button()}>Adotar um pet</Button>
            <InlineLink href="#" rightIcon>
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
            quality={100}
            data-testid={homePageTestIds.firstSection.decorativeImage()}
          />
        </div>
      </section>
      <section className="flex h-full w-full px-6 py-12 sm:items-center sm:justify-center md:gap-6 md:px-12 md:py-20 lg:px-24 lg:py-40 tablet:h-screen">
        <div className="relative hidden h-full w-1/2 tablet:flex">
          <Image
            src="/images/how-adottami-works.png"
            alt="Entenda como a Adottami funciona"
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="flex w-full flex-col sm:w-1/2">
          <h2 className="mb-4 text-xl font-bold leading-none text-primary-dark md:text-2xl lg:text-3xl">
            {HOW_ADOTTAMI_WORKS}
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-md text-primary-dark lg:text-lg">{FIRST_DESCRIPTION_OF_HOW_IT_WORKS}</p>
            <p className="text-md text-primary-dark lg:text-lg">{SECOND_DESCRIPTION_OF_HOW_IT_WORKS}</p>
            <p className="text-md text-primary-dark lg:text-lg">{THIRD_DESCRIPTION_OF_HOW_IT_WORKS}</p>
          </div>
        </div>
      </section>
    </div>
  </Page>
);

export default HomePage;
