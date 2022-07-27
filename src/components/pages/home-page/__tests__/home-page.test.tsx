import { screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import createPublication from '@/models/publication/__tests__/factories/publication-factory';
import PublicationFactory from '@/models/publication/publication-factory';
import publicationResponseHandler from '@/services/adottami-client/publication-client/__tests__/mocks/publication-response-handler';
import { renderWithTestProviders } from '@tests/utils/render';

import {
  ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TEXT,
  ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TITLE,
  FIRST_DESCRIPTION_OF_HOW_IT_WORKS,
  homePageTestIds,
  HOW_ADOTTAMI_WORKS,
  PAGE_TITLE,
  SECOND_DESCRIPTION_OF_HOW_IT_WORKS,
  SLOGAN_MESSAGE,
  THIRD_DESCRIPTION_OF_HOW_IT_WORKS,
} from '../constants';
import HomePage from '../home-page';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Home page', () => {
  beforeEach(() => {
    const publications = [
      createPublication({
        name: 'Leleco',
        images: [
          {
            id: '1',
            url: 'imagem.png',
          },
        ],
      }),
      createPublication({
        name: 'Lilica',
        images: [
          {
            id: '1',
            url: 'imagem.png',
          },
        ],
      }),
      createPublication({
        name: 'Nunu',
        images: [
          {
            id: '1',
            url: 'imagem.png',
          },
        ],
      }),
    ];
    const publicationsResponses = publications.map((publication) => PublicationFactory.toResponse(publication));
    publicationResponseHandler.mockGet(publicationsResponses);
  });

  it('should render the first section correctly', async () => {
    renderWithTestProviders(<HomePage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByText(SLOGAN_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.description())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.button())).toBeInTheDocument();
    expect(screen.getByText(/saiba mais/i)).toBeInTheDocument();
  });

  it('should render `how adottami works` section correctly', async () => {
    renderWithTestProviders(<HomePage />);
    expect(screen.getByText(HOW_ADOTTAMI_WORKS)).toBeInTheDocument();
    expect(screen.getByText(FIRST_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(SECOND_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(THIRD_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByAltText(/entenda como o adottami funciona/i)).toBeInTheDocument();
  });

  it('should render `recent publications` section correctly', async () => {
    renderWithTestProviders(<HomePage />);

    expect(await screen.findByText('Leleco')).toBeInTheDocument();
    expect(await screen.findByText('Lilica')).toBeInTheDocument();
    expect(await screen.findByText('Nunu')).toBeInTheDocument();
    expect(screen.getByText('Anúncios recentes')).toBeInTheDocument();
    expect(screen.getByText('Ver mais')).toBeInTheDocument();
    expect(screen.getByTestId('cards')).toBeInTheDocument();
  });

  it('should render `adopting an animal is act of love` section correctly', () => {
    renderWithTestProviders(<HomePage />);
    expect(screen.getByText(ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TEXT)).toBeInTheDocument();
    expect(screen.getByAltText(/adotar um animal é um ato de amor/i)).toBeInTheDocument();
  });
});
