import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Page from '@/components/common/page/page';
import Header from '@/components/pages/components/header/header';
import useAPI from '@/hooks/api/use-api/use-api';
import Publication from '@/models/publication/publication';

import EmptyData from '../components/empty-data/empty-data';
import Footer from '../components/footer/footer';
import PublicationCard from '../components/publication-card/publication-card';
import {
  ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TEXT,
  ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TITLE,
  FIRST_DESCRIPTION_OF_HOW_IT_WORKS,
  HOW_ADOTTAMI_WORKS_HEADING_ID,
  homePageTestIds,
  HOW_ADOTTAMI_WORKS,
  PAGE_TITLE,
  SECOND_DESCRIPTION_OF_HOW_IT_WORKS,
  SLOGAN_MESSAGE,
  THIRD_DESCRIPTION_OF_HOW_IT_WORKS,
} from './constants';

const HomePage: FC = () => {
  const router = useRouter();
  const api = useAPI();
  const [recentPublications, setRecentPublications] = useState<Publication[]>([]);

  useEffect(() => {
    const getRecentPublications = async () => {
      const publications = await api.adottami.publications.get({
        orderBy: 'most-recently-created',
        page: 1,
        perPage: 3,
      });
      setRecentPublications(publications);
    };

    getRecentPublications();
  }, [api.adottami.publications]);
  return (
    <Page title={PAGE_TITLE}>
      <Header />
      <div className="flex h-full w-full flex-col items-center justify-center bg-surface-primary">
        <section className="flex h-full w-full px-6 py-12 sm:items-center sm:justify-center md:gap-6 md:px-12 md:py-20 lg:px-24 lg:py-40">
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
              <Button
                onClick={() => router.push('/publications/search')}
                data-testid={homePageTestIds.firstSection.button()}
              >
                Adotar um pet
              </Button>
              <InlineLink href={`#${HOW_ADOTTAMI_WORKS_HEADING_ID}`} rightIcon>
                Saiba mais
              </InlineLink>
            </div>
          </div>
          <div className="relative hidden h-screen max-h-[32rem] w-1/2 tablet:flex">
            <Image
              src="/images/decorative-image.png"
              alt="Seção decorativa"
              layout="fill"
              objectFit="contain"
              quality={100}
              priority
              data-testid={homePageTestIds.firstSection.decorativeImage()}
            />
          </div>
        </section>
        <section className="w-full px-6 py-4 md:px-12 lg:px-24">
          <div className="flex flex-col items-center justify-center ">
            <div className="flex w-full justify-between sm:max-w-[50%] tablet:max-w-none">
              <h2 className="text-lg font-medium lg:text-2xl">Anúncios recentes</h2>
              <InlineLink href="/publications/search" rightIcon>
                Ver mais
              </InlineLink>
            </div>
            <div className="w-full max-w-[322px] overflow-x-scroll scrollbar scrollbar-track-transparent scrollbar-thumb-transparent sm:max-w-[50%] lg:min-w-full lg:overflow-auto tablet:max-w-none">
              <div
                data-testid="cards"
                className="flex w-[843px] min-w-[843px] gap-x-4 pt-6 md:w-full lg:w-full tablet:gap-x-14"
              >
                {recentPublications.length !== 0 ? (
                  recentPublications.map((publication) => {
                    return (
                      <div key={publication.id()} className="w-[281px] lg:w-full">
                        <PublicationCard publication={publication} />
                      </div>
                    );
                  })
                ) : (
                  <EmptyData message="Ainda não há anúncios publicados" />
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="flex h-full w-full px-6 pt-4 sm:items-center sm:justify-center md:gap-6 md:px-12 md:pt-20 lg:px-24 lg:pt-40">
          <div className="relative hidden h-screen max-h-[32rem] w-1/2 tablet:flex">
            <Image
              src="/images/how-adottami-works.png"
              alt="Entenda como o Adottami funciona"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
          <div className="flex w-full flex-col sm:w-1/2">
            <h2
              id={HOW_ADOTTAMI_WORKS_HEADING_ID}
              className="mb-4 text-xl font-bold leading-none text-primary-dark md:text-2xl lg:text-3xl"
            >
              {HOW_ADOTTAMI_WORKS}
            </h2>
            <div className="flex flex-col gap-2">
              <p className="text-md text-primary-dark lg:text-lg">{FIRST_DESCRIPTION_OF_HOW_IT_WORKS}</p>
              <p className="text-md text-primary-dark lg:text-lg">{SECOND_DESCRIPTION_OF_HOW_IT_WORKS}</p>
              <p className="text-md text-primary-dark lg:text-lg">{THIRD_DESCRIPTION_OF_HOW_IT_WORKS}</p>
            </div>
          </div>
        </section>
        <section className="flex h-full w-full px-6 pt-4 pb-24 sm:items-center sm:justify-center md:gap-6 md:px-12 md:pt-6 lg:px-24 lg:pt-24">
          <div className="flex w-full flex-col sm:w-1/2">
            <h2 className="mb-4 text-xl font-bold leading-none text-primary-dark md:text-2xl lg:text-3xl">
              {ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TITLE}
            </h2>
            <p className="text-md text-primary-dark lg:text-lg">{ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TEXT}</p>
          </div>
          <div className="relative hidden h-screen max-h-[32rem] w-1/2 tablet:flex">
            <Image
              src="/images/adopting-animal-is-act-of-love.png"
              alt="Adotar um animal é um ato de amor"
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        </section>
      </div>
      <Footer />
    </Page>
  );
};

export default HomePage;
