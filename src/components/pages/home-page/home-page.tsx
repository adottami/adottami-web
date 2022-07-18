import Image from 'next/image';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Page from '@/components/common/page/page';

import { homePageTestIds, PAGE_TITLE, SLOGAN_MESSAGE } from './constants';

const HomePage: FC = () => (
  <Page title={PAGE_TITLE}>
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
            data-testid={homePageTestIds.firstSection.decorativeImage()}
          />
        </div>
      </section>
      <section className="flex h-full w-full items-center justify-center px-6 md:gap-6 md:px-12 lg:px-24 tablet:h-screen">
        <div className="relative hidden h-full w-2/5 tablet:flex">
          <Image
            src="/images/how-adottami-works.png"
            alt="Entenda como Adottami funciona"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="w-full sm:w-1/2">
          <h2 className="text-xl font-bold leading-none text-primary-dark md:text-2xl lg:text-3xl">
            Entenda como Adottami funciona
          </h2>
          <p className="text-md text-primary-dark lg:text-lg">
            1- ONGs ou protetores fazem o seu cadastro gratuitamente e no mesmo instante já podem anúnciar os animais
            com detalhes sobre suas características e personalidade;
          </p>
          <p className="text-md text-primary-dark lg:text-lg">
            2- Pessoas que estão interessadas em ter um novo bichinho vão entrar no site e procurar um que tenha a ver
            com o perfil dele;
          </p>
          <p className="text-md text-primary-dark lg:text-lg">
            3- Quando acharem aquele especial, é só entrar em contato com o anunciante e pronto, é só combinar com o
            anunciante como buscar o mais novo membro da família!
          </p>
        </div>
      </section>
    </div>
  </Page>
);

export default HomePage;
