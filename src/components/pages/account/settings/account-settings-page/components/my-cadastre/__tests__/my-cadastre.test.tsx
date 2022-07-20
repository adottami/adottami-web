import { render, screen } from '@testing-library/react';

import { FIELD_LABELS, SECTION_TITLE } from '../constants';
import MyCadastre from '../my-cadastre';

describe('My cadastre section', () => {
  it('should render correctly', () => {
    render(<MyCadastre />);
  });

  it('should render section with correctly title', () => {
    render(<MyCadastre />);
    expect(screen.getByText(SECTION_TITLE)).toBeInTheDocument();
  });

  it('should render section with all fields labels correctly', () => {
    render(<MyCadastre />);
    FIELD_LABELS.forEach((fieldLabel) => expect(screen.getByText(fieldLabel)).toBeInTheDocument());
  });

  it('should render section with correctly button', () => {
    render(<MyCadastre />);
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });
});
