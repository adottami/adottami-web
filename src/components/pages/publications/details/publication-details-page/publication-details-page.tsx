import { FC } from 'react';

import Page from '@/components/common/page/page';
import Separator from '@/components/common/separator/separator';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';
import useSession from '@/hooks/session/use-session/use-session';

import AdvertiserCard from './components/advertiser-card';
import Carousel from './components/image-components/carousel';
import GridImages from './components/image-components/grid-images';
import Table from './components/table/table';
import Tag from './components/tag';
import { PAGE_TITLE } from './constants';

const PublicationDetailsPage: FC = () => {
  const { user, isLoading } = useSession();

  return (
    <Page title={PAGE_TITLE}>
      <Header />
      <div className="flex h-full w-full flex-col items-center justify-center px-6 py-12 md:gap-6 md:px-12 md:py-20 lg:px-24 tablet:flex-row tablet:items-baseline">
        <div className="w-full tablet:w-3/5">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold leading-none text-primary-dark">Duff</h1>
            <span className="text-md text-neutral-500">Publicado em 06/06 às 00:12</span>

            <div className="hidden tablet:flex">
              <GridImages />
            </div>

            <div className="flex tablet:hidden">
              <Carousel />
            </div>

            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />

            <h2 className="text-lg font-bold text-neutral-800">Descrição</h2>
            <p className="text-md text-neutral-800">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus ante cursus duis ut quam mi vulputate
              lacus. Ipsum id in vitae velit, sed rutrum viverra diam orci. Nam ac consectetur velit vel quis fringilla
              est pellentesque amet. Nibh in commodo vestibulum id eleifend pharetra imperdiet nulla. Amet faucibus at
              aliquam aliquam. Orci cursus sit dui fermentum, tristique posuere diam pretium. Non sagittis dignissim id
              sagittis, ridiculus in dictum sed suscipit. Eget sollicitudin lobortis ac, rutrum. Posuere sed tellus quis
              tortor rutrum eleifend cursus. Sed odio malesuada consectetur est pharetra nulla elementum. Pretium
              gravida semper duis cras auctor cursus ut. Viverra tristique placerat turpis tristique fringilla. Massa mi
              diam suspendisse scelerisque ultrices netus pharetra proin mauris.
            </p>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-neutral-800">Detalhes</h2>
              <Table variant="details" />
            </div>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <h2 className="mb-2 text-lg font-bold text-neutral-800">Características</h2>
            <div className="flex flex-wrap gap-3">
              <Tag label="Brincalhão" />
              <Tag label="Dócil" />
              <Tag label="Calmo" />
              <Tag label="Sociável com crianças" />
            </div>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-neutral-800">Localização</h2>
              <Table variant="localization" />
            </div>
          </div>
        </div>
        <div className="w-full tablet:w-2/5">
          <AdvertiserCard authenticated={!isLoading && user !== null} />
        </div>
      </div>
      <Footer />
    </Page>
  );
};

export default PublicationDetailsPage;
