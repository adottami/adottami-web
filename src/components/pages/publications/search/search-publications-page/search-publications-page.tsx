import { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';

import Button from '@/components/common/button/button';
import Page from '@/components/common/page/page';
import Footer from '@/components/pages/components/footer/footer';
import Header from '@/components/pages/components/header/header';
import useAPI from '@/hooks/api/use-api/use-api';
import Publication from '@/models/publication/publication';

import Categories from '../components/categories';
import LocationInput from '../components/location-input';
import PublicationList from '../components/publication-list';
import { PAGE_TITLE, SEARCH_VALUES_INITIAL_STATE } from './constants';
import { Search } from './types';

const SearchPublicationsPage: FC = () => {
  const [searchValues, setSearchValues] = useState<Search>(SEARCH_VALUES_INITIAL_STATE);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [currentPublicationsPage, setCurrentPublicationsPage] = useState<number>(1);
  const api = useAPI();

  useEffect(() => {
    const fetchFirstPublications = async () => {
      try {
        const publicationsData = await api.adottami.publications.get(searchValues);
        setPublications(publicationsData);
      } catch (error) {
        if (!(error instanceof AxiosError)) throw error;
      }
    };
    fetchFirstPublications();
  }, [searchValues, api.adottami.publications]);

  const fetchMorePublications = async () => {
    try {
      const publicationsData = await api.adottami.publications.get({
        ...searchValues,
        page: currentPublicationsPage + 1,
      });
      if (publicationsData.length !== 0) {
        setCurrentPublicationsPage(currentPublicationsPage + 1);
      }
      setPublications((publications) => [...publications, ...publicationsData]);
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
    }
  };

  return (
    <Page title={PAGE_TITLE}>
      <div className="min-w-screen relative flex h-full min-h-screen flex-col items-center">
        <Header />

        <div className="flex h-60 w-full items-center justify-center bg-secondary-medium p-6 md:h-32">
          <div className="w-full md:w-3/5">
            <LocationInput setSearchValues={setSearchValues} />
          </div>
        </div>

        <div className="mt-8 w-11/12 px-5 md:w-3/5 ">
          <h1 className="mb-4 text-xl font-bold text-primary-dark md:mb-8 md:text-2xl">Buscar por categoria</h1>
          <div className="h-auto w-full overflow-x-scroll scroll-smooth scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-track-transparent scrollbar-thumb-transparent md:overflow-x-auto">
            <Categories setSearchValues={setSearchValues} />
          </div>
        </div>

        <div className="mt-7 flex w-full justify-center md:w-3/5">
          <PublicationList publications={publications} />
        </div>

        <div className="mt-8" />

        <div>
          {publications.length > 0 ? (
            <Button variant="loadMore" onClick={fetchMorePublications}>
              Carregar mais
            </Button>
          ) : null}
        </div>

        <div className="mt-[500px] md:mt-[400px]" />

        <div className="absolute bottom-0 w-full">
          <Footer />
        </div>
      </div>
    </Page>
  );
};

export default SearchPublicationsPage;
