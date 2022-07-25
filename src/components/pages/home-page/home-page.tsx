import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Page from '@/components/common/page/page';
import Header from '@/components/pages/components/header/header';
import Publication from '@/models/publication/publication';

import PublicationCard from '../components/publication-card/publication-card';
import {
  FIRST_DESCRIPTION_OF_HOW_IT_WORKS,
  HOW_ADOTTAMI_WORKS_HEADING_ID,
  homePageTestIds,
  HOW_ADOTTAMI_WORKS,
  PAGE_TITLE,
  SECOND_DESCRIPTION_OF_HOW_IT_WORKS,
  SLOGAN_MESSAGE,
  THIRD_DESCRIPTION_OF_HOW_IT_WORKS,
} from './constants';

const recentPublications = {
  publication1: new Publication({
    id: '1',
    name: 'Lila',
    description: 'Adoravel',
    category: 'Dog',
    gender: 'Female',
    breed: 'Husky',
    weightInGrams: 20000,
    ageInYears: 5,
    zipCode: '54814-043',
    city: 'Campina Grande',
    state: 'PB',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '1',
        url: 'https://love.doghero.com.br/wp-content/uploads/2018/08/husky-siberiano-2.webp',
      },

      {
        id: '2',
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fmiroha%2Fmiroha1510%2Fmiroha151000030%2F47217838-siberian-brown-husky-with-blue-eye-lying-on-the-green-lawn.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_47217838_siberian-brown-husky-with-blue-eye-lying-on-the-green-lawn.html&tbnid=pofK3hjQGf5sdM&vet=12ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygKegUIARDYAQ..i&docid=Z0BYgP-oKvHrmM&w=1300&h=866&q=husky%20siberiano%20brown&ved=2ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygKegUIARDYAQ',
      },
      {
        id: '3',
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fportrait-of-siberian-husky-dog-on-white-background-picture-id1239520844%3Fk%3D20%26m%3D1239520844%26s%3D612x612%26w%3D0%26h%3DQxZdD1qAdvDZTHUzuudgv0cg4JyM0ZIQ1le4dPgsJdQ%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fbr%2Ffotos%2Fsiberian-husky&tbnid=87H5rIod1O9V7M&vet=12ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygJegUIARDVAQ..i&docid=RvGLTOgupteCRM&w=612&h=408&q=husky%20siberiano%20brown&ved=2ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygJegUIARDVAQ',
      },
    ],
    author: {
      id: '1',
      name: 'Emanuel',
      email: 'emanuelaraujo_14@hotmail.com',
    },
  }),
  publication2: new Publication({
    id: '1',
    name: 'Nunu',
    description: 'Adoravel',
    category: 'Cat',
    gender: 'Male',
    breed: 'Siames',
    weightInGrams: 20000,
    ageInYears: 5,
    zipCode: '54814-043',
    city: 'Campina Grande',
    state: 'PB',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '1',
        url: 'https://love.doghero.com.br/wp-content/uploads/2022/02/adocao-de-gatos-DogHero-1.jpg',
      },

      {
        id: '2',
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpreviews.123rf.com%2Fimages%2Fmiroha%2Fmiroha1510%2Fmiroha151000030%2F47217838-siberian-brown-husky-with-blue-eye-lying-on-the-green-lawn.jpg&imgrefurl=https%3A%2F%2Fwww.123rf.com%2Fphoto_47217838_siberian-brown-husky-with-blue-eye-lying-on-the-green-lawn.html&tbnid=pofK3hjQGf5sdM&vet=12ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygKegUIARDYAQ..i&docid=Z0BYgP-oKvHrmM&w=1300&h=866&q=husky%20siberiano%20brown&ved=2ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygKegUIARDYAQ',
      },
      {
        id: '3',
        url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fportrait-of-siberian-husky-dog-on-white-background-picture-id1239520844%3Fk%3D20%26m%3D1239520844%26s%3D612x612%26w%3D0%26h%3DQxZdD1qAdvDZTHUzuudgv0cg4JyM0ZIQ1le4dPgsJdQ%3D&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fbr%2Ffotos%2Fsiberian-husky&tbnid=87H5rIod1O9V7M&vet=12ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygJegUIARDVAQ..i&docid=RvGLTOgupteCRM&w=612&h=408&q=husky%20siberiano%20brown&ved=2ahUKEwjMwsiKlfn4AhWXM7kGHVJpCY0QMygJegUIARDVAQ',
      },
    ],
    author: {
      id: '1',
      name: 'Emanuel',
      email: 'emanuelaraujo_14@hotmail.com',
    },
  }),
  publication3: new Publication({
    id: '1',
    name: 'Leleco',
    description: 'Adoravel',
    category: 'Frog',
    gender: 'Male',
    breed: 'Green Frog',
    weightInGrams: 20000,
    ageInYears: 5,
    zipCode: '54814-043',
    city: 'Campina Grande',
    state: 'PB',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '1',
        url: 'https://img.r7.com/images/sapos-sucesso-instagram-tendencias-03032020180552694?dimensions=771x420&no_crop=true',
      },

      {
        id: '2',
        url: 'https://www.pinterest.com/pin/733172014310166063/',
      },
      {
        id: '3',
        url: 'https://www.pinterest.com/pin/733172014310166063/',
      },
    ],
    author: {
      id: '1',
      name: 'Emanuel',
      email: 'emanuelaraujo_14@hotmail.com',
    },
  }),
};

const HomePage: FC = () => {
  const router = useRouter();
  return (
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
          <div className="relative hidden h-full w-1/2 tablet:flex">
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

        <section className="w-full px-6 py-4 md:px-12  lg:px-24 ">
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
                <div className="w-[281px] lg:w-full">
                  <PublicationCard publication={recentPublications.publication1} />
                </div>
                <div className=" w-[281px] lg:w-full">
                  <PublicationCard publication={recentPublications.publication2} />
                </div>
                <div className=" w-[281px]  lg:w-full">
                  <PublicationCard publication={recentPublications.publication3} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex h-full w-full px-6 py-12 sm:items-center sm:justify-center md:gap-6 md:px-12 md:py-20 lg:px-24 lg:py-40 tablet:h-screen">
          <div className="relative hidden h-full w-1/2 tablet:flex">
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
      </div>
    </Page>
  );
};

export default HomePage;
