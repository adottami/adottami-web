import { FC } from 'react';

import CategoryIcon from '@/components/icons/category-icon';

import { Search } from '../search-publications-page/types';
import { LOCATION_INFO } from './constants';

interface Props {
  setSearchValues: (Func: (prevState: Search) => Search) => void;
}

const Categories: FC<Props> = ({ setSearchValues }) => {
  const handleSetCategorieValue = (variant: string) => {
    setSearchValues((prevState) => ({ ...prevState, categorie: variant }));
  };

  return (
    <div className="flex h-full gap-4 md:flex-wrap">
      {LOCATION_INFO.map(({ variant, name }) => (
        <button
          type="button"
          data-testid={`categorie-${variant}`}
          key={name}
          className="flex h-12 w-32 min-w-[7rem] items-center justify-center gap-2 rounded-pill border-2 border-neutral-100 px-1 focus:border-2 focus:border-secondary-medium focus:outline-none"
          onClick={() => handleSetCategorieValue(name)}
        >
          <CategoryIcon variant={variant} width="1.6em" height="1.6em" />
          <span className="text-sm text-neutral-800 md:text-md 2xl:text-lg">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
