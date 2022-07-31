import { screen } from '@testing-library/react';

import { renderWithTestProviders } from '@tests/utils/render';

import { FIELD_LABELS, SECTION_TITLE } from '../constants';
import MyCadastre from '../my-cadastre';

describe('My cadastre section', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<MyCadastre />);
  });

  it('should render section with correctly title', () => {
    renderWithTestProviders(<MyCadastre />);
    expect(screen.getByText(SECTION_TITLE)).toBeInTheDocument();
  });

  it('should render section with all fields labels correctly', () => {
    renderWithTestProviders(<MyCadastre />);
    FIELD_LABELS.forEach((fieldLabel) => expect(screen.getByRole('label', { name: fieldLabel })).toBeInTheDocument());
  });

  it('should render section with correctly button', () => {
    renderWithTestProviders(<MyCadastre />);
    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });
});
