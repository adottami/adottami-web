import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '../header';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Header', () => {
  it('should render correctly with prop isAuth as true', () => {
    const { getByText } = render(<Header isAuth username="Emanuel" />);
    expect(getByText('Emanuel')).toBeInTheDocument();
    expect(getByText('Meus Anúncios')).toBeInTheDocument();
    expect(getByText('Favoritos')).toBeInTheDocument();
    expect(getByText('Anunciar um pet')).toBeInTheDocument();
  });

  it('should render correctly the menu at mobile when clicked with prop isAuth as true', async () => {
    const { getByTestId } = render(<Header isAuth username="Emanuel" />);
    const menuHamburguer = getByTestId('hamburguer-menu');
    const user = userEvent.setup();

    await user.click(menuHamburguer);

    expect(screen.getAllByText('Emanuel')[0]).toBeInTheDocument();
    expect(screen.getByText('Minha conta')).toBeInTheDocument();
    expect(screen.getByText('Buscar pet')).toBeInTheDocument();
    expect(screen.getAllByText('Meus Anúncios')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Favoritos')[0]).toBeInTheDocument();
    expect(screen.getByText('Login e segurança')).toBeInTheDocument();
    expect(screen.getByText('Sair')).toBeInTheDocument();
  });

  it('should render correctly the menu at mobile when clicked with prop isAuth as false', async () => {
    const { getByTestId } = render(<Header isAuth={false} username="Emanuel" />);
    const menuHamburguer = getByTestId('hamburguer-menu');
    const user = userEvent.setup();

    await user.click(menuHamburguer);

    expect(screen.getAllByText('Entrar')[0]).toBeInTheDocument();
    expect(screen.getByText('Buscar pet')).toBeInTheDocument();
    expect(screen.getAllByText('Meus Anúncios')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Favoritos')[0]).toBeInTheDocument();
  });

  it('should render correctly with prop isAuth as false', () => {
    const { getByText } = render(<Header isAuth={false} username="Emanuel" />);
    expect(getByText('Entrar')).toBeInTheDocument();
    expect(getByText('Meus Anúncios')).toBeInTheDocument();
    expect(getByText('Favoritos')).toBeInTheDocument();
    expect(getByText('Anunciar um pet')).toBeInTheDocument();
  });

  it('should render button with name "Anunciar" at mobile', () => {
    const { getByText } = render(<Header isAuth={false} username="Emanuel" />);
    expect(getByText('Anunciar')).toBeInTheDocument();
  });
});
