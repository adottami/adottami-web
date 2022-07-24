import { screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';
import { renderWithTestProviders } from '@tests/utils/render';

import {
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
  it('should render the first section correctly', () => {
    renderWithTestProviders(<HomePage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByText(SLOGAN_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.description())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.button())).toBeInTheDocument();
    expect(screen.getByText(/saiba mais/i)).toBeInTheDocument();
  });

  it('should render `how adottami works` section correctly', () => {
    renderWithTestProviders(<HomePage />);
    expect(screen.getByText(HOW_ADOTTAMI_WORKS)).toBeInTheDocument();
    expect(screen.getByText(FIRST_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(SECOND_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(THIRD_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByAltText(/entenda como a adottami funciona/i)).toBeInTheDocument();
  });
});
