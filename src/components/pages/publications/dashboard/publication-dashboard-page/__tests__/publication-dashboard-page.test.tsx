import { screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import createPublication from '@/models/publication/__tests__/factories/publication-factory';
import PublicationFactory from '@/models/publication/publication-factory';
import publicationResponseHandler from '@/services/adottami-client/publication-client/__tests__/mocks/publication-response-handler';
import { renderWithTestProviders } from '@tests/utils/render';

import { PAGE_TITLE } from '../constants';
import PublicationDashboardPage from '../publication-dashboard-page';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: 'publications/dashboard',
    };
  },
}));
describe('Publication dashboard page', () => {
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
    createPublication({
      name: 'Augusto',
      images: [
        {
          id: '1',
          url: 'imagem.png',
        },
      ],
    }),
  ];
  const publicationResponses = publications.map((publication) => PublicationFactory.toResponse(publication));

  beforeEach(() => {
    publicationResponseHandler.mockGet(publicationResponses);
  });

  it('should render correctly', async () => {
    renderWithTestProviders(<PublicationDashboardPage />);
    const myAds = await screen.findAllByText('Meus anúncios');

    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(await screen.findByText('Leleco')).toBeInTheDocument();
    expect(await screen.findByText('Lilica')).toBeInTheDocument();
    expect(await screen.findByText('Nunu')).toBeInTheDocument();
    expect(await screen.findByText('Augusto')).toBeInTheDocument();
    expect(screen.getByText('Publicados (4)')).toBeInTheDocument();

    expect(myAds.length).toEqual(2);
  });
});
