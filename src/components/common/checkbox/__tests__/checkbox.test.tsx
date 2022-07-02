import { render } from '@testing-library/react';

import Checkbox from '../checkbox';

describe('Checkbox', () => {
  it('should render correctly', () => {
    const categories = [
      'Brincalhão',
      'Dócil',
      'Calmo',
      'Sociável',
      'Sociável com crianças',
      'Castrado',
      'Vacinado',
      'Vermifugado',
      'Vive bem em apartamento',
      'Vive bem em casa com quintal',
    ];
    render(<Checkbox title="Características" categoriesName={categories} />);
    // ...
  });
});
