import { FC } from 'react';

import LocationInput from '@/components/pages/publications/search/components/location-input/location-input';

const SearchPublicationsPage: FC = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center">
      <div className="flex h-60 w-full items-center justify-center bg-secondary-medium md:h-32">
        <div className="w-4/5">
          <LocationInput />
        </div>
      </div>
    </div>
  );
};

export default SearchPublicationsPage;
