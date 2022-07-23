import { render, screen } from '@testing-library/react';

import { expectPageTitleWithApplicationName } from '@/components/common/page/__tests__/utils';

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

describe('Home page', () => {
  it('should render the first section correctly', () => {
    render(<HomePage />);
    expectPageTitleWithApplicationName(PAGE_TITLE);
    expect(screen.getByText(SLOGAN_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.decorativeImage())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.description())).toBeInTheDocument();
    expect(screen.getByTestId(homePageTestIds.firstSection.button())).toBeInTheDocument();
    expect(screen.getByText(/saiba mais/i)).toBeInTheDocument();
  });

  it('should render `how adottami works` section correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(HOW_ADOTTAMI_WORKS)).toBeInTheDocument();
    expect(screen.getByText(FIRST_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(SECOND_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByText(THIRD_DESCRIPTION_OF_HOW_IT_WORKS)).toBeInTheDocument();
    expect(screen.getByAltText(/entenda como a adottami funciona/i)).toBeInTheDocument();
  });

  it('should render `adopting an animal is act of love` section correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TITLE)).toBeInTheDocument();
    expect(screen.getByText(ADOPTING_ANIMAL_IS_ACT_OF_LOVE_TEXT)).toBeInTheDocument();
    expect(screen.getByAltText(/adotar um animal é um ato de amor/i)).toBeInTheDocument();
  });
});
