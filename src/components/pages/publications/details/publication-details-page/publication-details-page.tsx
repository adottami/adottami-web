import { FC, useEffect, useState } from 'react';

import Page from '@/components/common/page/page';
import Separator from '@/components/common/separator/separator';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';
import usePageParameters from '@/components/pages/publications/details/publication-details-page/hooks/use-page-parameters/use-page-parameters';
import useAPI from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';
import Publication from '@/models/publication/publication';

import AdvertiserCard from './components/advertiser-card';
import Carousel from './components/image-components/carousel';
import GridImages from './components/image-components/grid-images';
import Table from './components/table/table';
import Tag from './components/tag';
import { PAGE_TITLE } from './constants';
import { getPublicationDate } from './utils';

const PublicationDetailsPage: FC = () => {
  const api = useAPI();
  const { user, isLoading } = useSession();
  const pageParameters = usePageParameters();

  const [publication, setPublication] = useState<Publication | null>(null);

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      if (pageParameters.publicationId !== undefined) {
        const publication = await api.adottami.publications.getById(pageParameters.publicationId);
        setPublication(publication);
      }
    };
    fetchPublicationDetails();
  }, [api.adottami.publications, pageParameters.publicationId]);

  return (
    <Page title={PAGE_TITLE}>
      <Header />
      <div className="flex h-full w-full flex-col items-center justify-center px-6 py-12 md:gap-6 md:px-12 md:py-20 lg:px-24 tablet:flex-row tablet:items-baseline">
        <div className="w-full tablet:w-3/5">
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold leading-none text-primary-dark">{publication?.name()}</h1>
            <span className="text-md text-neutral-500">Publicado em {getPublicationDate(publication)}</span>

            <div className="hidden tablet:flex">
              <GridImages images={publication?.images()} />
            </div>

            <div className="flex tablet:hidden">
              <Carousel images={publication?.images()} />
            </div>

            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />

            <h2 className="text-lg font-bold text-neutral-800">Descrição</h2>
            <p className="text-md text-neutral-800">{publication?.description()}</p>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-neutral-800">Detalhes</h2>
              <Table variant="details" publication={publication} />
            </div>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <h2 className="mb-2 text-lg font-bold text-neutral-800">Características</h2>
            <div className="flex flex-wrap gap-3">
              {publication?.characteristics().map((characteristic) => (
                <Tag key={characteristic.id} label={characteristic.name} />
              ))}
            </div>
            <Separator className="before:h-0.5 before:w-12 after:h-0.5 after:w-12" />
            <div>
              <h2 className="mb-2 text-lg font-bold text-neutral-800">Localização</h2>
              <Table variant="localization" publication={publication} />
            </div>
          </div>
        </div>
        <div className="w-full py-4 tablet:w-2/5">
          <AdvertiserCard advertiser={publication?.author()} authenticated={!isLoading && user !== null} />
        </div>
      </div>
      <Footer />
    </Page>
  );
};

export default PublicationDetailsPage;
