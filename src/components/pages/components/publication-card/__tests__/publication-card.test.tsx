import { render, screen } from '@testing-library/react';

import { LINK_TO_DETAILS_PAGE_LABEL } from '../constants';
import PublicationCard from '../publication-card';
import { publicationFemaleMock, publicationMaleMock } from './mock/publication-mock';
import { publicationCardTestIds } from './test-ids';

describe('Publication card', () => {
  it('should render a male card correctly, and the publication should have 4 pictures', () => {
    render(<PublicationCard publication={publicationMaleMock} />);

    expect(screen.getByTestId(publicationCardTestIds.male())).toBeInTheDocument();
    expect(screen.getByText('4 Foto(s)')).toBeInTheDocument();
  });

  it('should render a female card correctly, and the publication should have 2 pictures', () => {
    render(<PublicationCard publication={publicationFemaleMock} />);

    expect(screen.getByTestId(publicationCardTestIds.female())).toBeInTheDocument();
    expect(screen.getByText('2 Foto(s)')).toBeInTheDocument();
  });

  it('should render a card that should be menu icon correctly', () => {
    render(<PublicationCard publication={publicationMaleMock} isMenuVisible />);

    expect(screen.getByTestId(publicationCardTestIds.menuIcon())).toBeInTheDocument();
  });

  it('should render a card that should be menu icon with an archived publication correctly, also the publication card should have the archived status', () => {
    render(<PublicationCard publication={publicationFemaleMock} isMenuVisible />);

    expect(screen.getByTestId(publicationCardTestIds.menuIconArchived())).toBeInTheDocument();
  });

  it('should have a link that leads to the publication details page', () => {
    render(<PublicationCard publication={publicationMaleMock} />);

    const linkToDetailsPage = screen.getByRole('link', { name: LINK_TO_DETAILS_PAGE_LABEL });
    expect(linkToDetailsPage).toHaveAttribute('href', `/publications/details/${publicationMaleMock.id()}`);
  });
});
