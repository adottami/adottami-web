import { FC } from 'react';

import CategoryIcon from '@/components/icons/category-icon';

const categoriesInfo = [
  {
    variant: 'dog',
    name: 'Cachorro',
  },
  {
    variant: 'cat',
    name: 'Gato',
  },
  {
    variant: 'rabbit',
    name: 'Coelho',
  },
  {
    variant: 'hamster',
    name: 'Hamster',
  },
  {
    variant: 'bird',
    name: 'Passaro',
  },
  {
    variant: 'fish',
    name: 'Peixe',
  },
  {
    name: 'Outros',
  },
];

const Categories: FC = () => {
  return (
    <div className="flex gap-4 md:grid md:grid-cols-4">
      {categoriesInfo.map(({ variant, name }) => (
        <button
          type="button"
          data-testid={`categorie-${variant}`}
          className="flex h-12 w-32 min-w-[7rem] items-center justify-center gap-2 rounded-pill border-2 border-neutral-100 md:w-4/5"
        >
          <CategoryIcon variant={variant} width="1.6em" height="1.6em" />
          <span className="text-neutral-800 md:text-lg">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default Categories;
