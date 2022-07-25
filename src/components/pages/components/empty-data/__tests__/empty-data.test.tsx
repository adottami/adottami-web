import { render, screen } from '@testing-library/react';

import EmptyData from '../empty-data';

describe('EmptyData', () => {
  it('should render footer correctly', () => {
    render(<EmptyData message="Aqui está uma messagem !" />);

    expect(screen.getByText('Aqui está uma messagem !')).toBeInTheDocument();
  });
});
