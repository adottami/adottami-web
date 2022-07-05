import { render, screen } from '@testing-library/react';

import Button from '../button';
import { buttonTestIds } from '../constants';

describe('Button', () => {
  it('should render loading button correctly', () => {
    render(<Button loading>Label</Button>);

    const loadingIcon = screen.getByTestId(buttonTestIds.loadingIcon());
    expect(loadingIcon).toBeInTheDocument();
    expect(loadingIcon).toHaveAttribute('aria-hidden', 'false');
  });

  describe('Primary button', () => {
    it('should render primary button correctly', () => {
      render(<Button variant="primary">Label</Button>);

      expect(screen.getByTestId(buttonTestIds.primary())).toBeInTheDocument();
    });
  });

  describe('Secondary button', () => {
    it('should render secondary button correctly', () => {
      render(<Button variant="secondary">Label</Button>);

      expect(screen.getByTestId(buttonTestIds.secondary())).toBeInTheDocument();
    });
  });
});
