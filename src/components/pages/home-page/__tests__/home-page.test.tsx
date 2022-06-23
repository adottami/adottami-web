import { render, screen } from '@testing-library/react';

import { WELCOME_MESSAGE } from '../constants';
import HomePage from '../home-page';

describe('Home page', () => {
  it('should render a welcome message correctly', () => {
    render(<HomePage />);
    expect(screen.getByText(WELCOME_MESSAGE)).toBeInTheDocument();
  });
});
