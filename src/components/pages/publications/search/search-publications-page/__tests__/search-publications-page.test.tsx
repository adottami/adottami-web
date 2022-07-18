import { render, screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

import { PAGE_TITLE } from '../constants';
import SearchPublicationsPage from '../search-publications-page';

describe('Search publication page', () => {
  it('should render correctly', () => {
    render(<SearchPublicationsPage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
  });
  it('should render input correctly', () => {
    render(<SearchPublicationsPage />);

    const stateInput = screen.getByPlaceholderText('Estado');
    const cityInput = screen.getByPlaceholderText('Cidade');

    expect(stateInput).toBeInTheDocument();
    expect(cityInput).toBeInTheDocument();
  });
  it('should render search button correctly', () => {
    render(<SearchPublicationsPage />);

    const searchButton = screen.getByTestId('search-button');

    expect(searchButton).toBeInTheDocument();
  });
  it('should render categories correctly', () => {
    render(<SearchPublicationsPage />);

    const dogCategorie = screen.getByTestId('categorie-dog');
    const catCategorie = screen.getByTestId('categorie-cat');
    const rabbitCategorie = screen.getByTestId('categorie-rabbit');
    const hamsterCategorie = screen.getByTestId('categorie-hamster');
    const birdCategorie = screen.getByTestId('categorie-bird');
    const fishCategorie = screen.getByTestId('categorie-fish');

    expect(dogCategorie).toBeInTheDocument();
    expect(catCategorie).toBeInTheDocument();
    expect(rabbitCategorie).toBeInTheDocument();
    expect(hamsterCategorie).toBeInTheDocument();
    expect(birdCategorie).toBeInTheDocument();
    expect(fishCategorie).toBeInTheDocument();
  });
});
