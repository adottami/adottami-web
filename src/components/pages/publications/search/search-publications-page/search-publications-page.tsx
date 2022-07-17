import { FC } from 'react';

import Page from '@/components/common/page/page';
import LocationInput from '@/components/pages/publications/search/components/location-input/location-input';

import Categories from '../components/Categories/categories';
import { PAGE_TITLE } from './constants';

const SearchPublicationsPage: FC = () => {
  return (
    <Page title={PAGE_TITLE}>
      <div className="min-w-screen flex h-screen flex-col md:items-center">
        <div className="flex h-60 w-full items-center justify-center bg-secondary-medium md:h-32">
          <div className="w-4/5">
            <LocationInput />
          </div>
        </div>

        <div className="mt-8 px-5 md:w-4/5">
          <h1 className="mb-4 text-xl font-bold text-primary-dark md:mb-8 md:text-2xl">Buscar por categoria</h1>
          <div className="h-full w-full overflow-x-scroll scroll-smooth whitespace-nowrap">
            <Categories />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SearchPublicationsPage;
