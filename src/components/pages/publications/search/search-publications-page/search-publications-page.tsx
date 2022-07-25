import { FC, useState } from 'react';

import Page from '@/components/common/page/page';

import Categories from '../components/categories';
import LocationInput from '../components/location-input';
import PublicationList from '../components/publication-list';
import { PAGE_TITLE, SEARCH_VALUES_INITIAL_STATE } from './constants';
import { Search } from './types';

const SearchPublicationsPage: FC = () => {
  const [searchValues, setSearchValues] = useState<Search>(SEARCH_VALUES_INITIAL_STATE);
  console.log(searchValues);

  return (
    <Page title={PAGE_TITLE}>
      <div className="min-w-screen flex h-screen flex-col items-center">
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
          <PublicationList />
        </div>
      </div>
    </Page>
  );
};

export default SearchPublicationsPage;
