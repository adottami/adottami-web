import { screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { PublicationResponse } from '@/models/publication/types';
import AdottamiClient from '@/services/adottami-client/adottami-client';
import publicationResponseHandler from '@/services/adottami-client/publication-client/__tests__/mocks/publication-response-handler';
import { GetPublicationsOptions } from '@/services/adottami-client/publication-client/types';
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

const publicationResponses: PublicationResponse[] = [
  {
    id: '1',
    name: 'Leleco',
    description: 'My pet',
    category: 'Cat',
    gender: 'Male',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '65c3dcbe-2690-437b-bb96-e8487e123284',
        url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\65c3dcbe-2690-437b-bb96-e8487e123284',
      },
    ],
    author: {
      id: '1',
      name: 'User',
      email: 'user@email.com',
      phoneNumber: '1100001111',
    },
  },
  {
    id: '2',
    name: 'Lilica',
    description: 'My pet',
    category: 'Cat',
    gender: 'Male',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '65c3dcbe-2690-437b-bb96-e8487e123284',
        url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\65c3dcbe-2690-437b-bb96-e8487e123284',
      },
    ],
    author: {
      id: '1',
      name: 'User',
      email: 'user@email.com',
      phoneNumber: '1100001111',
    },
  },
  {
    id: '3',
    name: 'Nunu',
    description: 'My pet',
    category: 'Cat',
    gender: 'Male',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    characteristics: [],
    images: [
      {
        id: '65c3dcbe-2690-437b-bb96-e8487e123284',
        url: 'C:\\Users\\emanu\\OneDrive\\Documentos\\Engenharia de Software\\Engenharia de Software\\adottami-backend\\tmp\\storage\\65c3dcbe-2690-437b-bb96-e8487e123284',
      },
    ],
    author: {
      id: '1',
      name: 'User',
      email: 'user@email.com',
      phoneNumber: '1100001111',
    },
  },
];
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Home page', () => {
  const adottamiClient = new AdottamiClient(null);

  it('should render the first section correctly', async () => {
    const getOptions: GetPublicationsOptions = {
      city: 'City',
      state: 'State',
      categories: ['Category 1', 'Category 2'],
      isArchived: false,
      authorId: '1',
      page: 2,
      perPage: 30,
      orderBy: 'createdAt',
    };

    publicationResponseHandler.mockGet(publicationResponses);
    await adottamiClient.publications.get(getOptions);
    renderWithTestProviders(<HomePage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByText(SLOGAN_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.description())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.button())).toBeInTheDocument();
    expect(screen.getByText(/saiba mais/i)).toBeInTheDocument();
  });

  it('should render `how adottami works` section correctly', async () => {
    const getOptions: GetPublicationsOptions = {
      city: 'City',
      state: 'State',
      categories: ['Category 1', 'Category 2'],
      isArchived: false,
      authorId: '1',
      page: 2,
      perPage: 30,
      orderBy: 'createdAt',
    };

    publicationResponseHandler.mockGet(publicationResponses);
    await adottamiClient.publications.get(getOptions);
    renderWithTestProviders(<HomePage />);
    expect(screen.getByText(HOW_ADOTTAMI_WORKS)).toBeInTheDocument();
    expect(screen.getByText(FIRST_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(SECOND_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(THIRD_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByAltText(/entenda como o adottami funciona/i)).toBeInTheDocument();
  });

  it('should render `recent publications` section correctly', async () => {
    const getOptions: GetPublicationsOptions = {
      city: 'City',
      state: 'State',
      categories: ['Category 1', 'Category 2'],
      isArchived: false,
      authorId: '1',
      page: 2,
      perPage: 30,
      orderBy: 'createdAt',
    };

    publicationResponseHandler.mockGet(publicationResponses);
    await adottamiClient.publications.get(getOptions);
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
