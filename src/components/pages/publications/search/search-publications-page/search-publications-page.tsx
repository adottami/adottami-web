import { FC } from 'react';

import Page from '@/components/common/page/page';
import LocationInput from '@/components/pages/publications/search/components/location-input/location-input';

import Categories from '../components/Categories/categories';
import { PAGE_TITLE } from './constants';

const SearchPublicationsPage: FC = () => {
  return (
    <Page title={PAGE_TITLE}>
      <div className="min-w-screen flex h-screen flex-col">
        <div className="flex h-60 w-full items-center justify-center bg-secondary-medium md:h-32">
          <div className="w-4/5">
            <LocationInput />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default SearchPublicationsPage;
