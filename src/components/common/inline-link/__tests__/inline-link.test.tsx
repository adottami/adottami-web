import { render, screen } from '@testing-library/react';

import InlineLink from '../inline-link';

describe('Inline link', () => {
  it('should render correctly', () => {
    render(<InlineLink href="/register">cadastre-se</InlineLink>);

    expect(screen.getByText('cadastre-se')).toBeInTheDocument();
  });

  it('should have correctly href', () => {
    render(<InlineLink href="/register">cadastre-se</InlineLink>);

    expect(screen.getByText('cadastre-se').getAttribute('href')).toEqual('/register');
  });

  it('should have render without href as a button', () => {
    render(<InlineLink onClick={() => console.log('test function')}>cadastre-se</InlineLink>);

    expect(screen.getByText('cadastre-se')).toBeInTheDocument();
  });
});
