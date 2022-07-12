import { render, screen } from '@testing-library/react';

import { homePageTestIds, SLOGAN_MESSAGE } from '../constants';
import HomePage from '../home-page';

describe('Home page', () => {
  it('should render the first section correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(SLOGAN_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.description())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.button())).toBeInTheDocument();
    expect(screen.getByText(/saiba mais/i)).toBeInTheDocument();
  });
});
