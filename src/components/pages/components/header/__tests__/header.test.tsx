import { screen } from '@testing-library/react';
import React from 'react';

import { renderWithTestProviders } from '@tests/utils/render';

import Header from '../header';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Header', () => {
  it('should render correctly unauthorized', () => {
    renderWithTestProviders(<Header />);
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    expect(screen.getByText('Meus Anúncios')).toBeInTheDocument();
    expect(screen.getByText('Anunciar um pet')).toBeInTheDocument();
  });

  it('should render button with name "Anunciar" at mobile', () => {
    renderWithTestProviders(<Header />);
    expect(screen.getByText('Anunciar')).toBeInTheDocument();
  });
});
