import { render, screen } from '@testing-library/react';

import { FIELD_LABELS, SECTION_TITLE } from '../constants';
import LoginAndSecurity from '../login-and-security';

describe('Account settings page', () => {
  it('should render correctly', () => {
    render(<LoginAndSecurity />);
  });

  it('should render section with correctly title', () => {
    render(<LoginAndSecurity />);
    expect(screen.getByText(SECTION_TITLE)).toBeInTheDocument();
  });

  it('should render section with all fields labels correctly', () => {
    render(<LoginAndSecurity />);
    FIELD_LABELS.forEach((fieldLabel) => expect(screen.getByRole('label', { name: fieldLabel })).toBeInTheDocument());
  });

  it('should render section with correctly button', () => {
    render(<LoginAndSecurity />);
    expect(screen.getByRole('button', { name: 'Enviar' })).toBeInTheDocument();
  });
});
