import { screen } from '@testing-library/react';

import { renderWithTestProviders } from '@tests/utils/render';

import { FIELD_LABELS, SECTION_TITLE } from '../constants';
import LoginAndSecurity from '../login-and-security';

describe('Account settings page', () => {
  it('should render correctly', () => {
    renderWithTestProviders(<LoginAndSecurity />);
  });

  it('should render section with correctly title', () => {
    renderWithTestProviders(<LoginAndSecurity />);
    expect(screen.getByText(SECTION_TITLE)).toBeInTheDocument();
  });

  it('should render section with all fields labels correctly', () => {
    renderWithTestProviders(<LoginAndSecurity />);
    FIELD_LABELS.forEach((fieldLabel) => expect(screen.getByRole('label', { name: fieldLabel })).toBeInTheDocument());
  });

  it('should render section with correctly button', () => {
    renderWithTestProviders(<LoginAndSecurity />);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });
});
