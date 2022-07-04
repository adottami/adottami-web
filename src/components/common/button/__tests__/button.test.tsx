import { render, screen } from '@testing-library/react';

import Button from '../button';
import { buttonTestIds } from '../constants';

describe('Button', () => {
  describe('Primary button', () => {
    it('should render primary button correctly', () => {
      render(<Button variant="primary">Label</Button>);

      expect(screen.getByTestId(buttonTestIds.primary())).toBeInTheDocument();
    });

    it('should render loading primary button correctly', () => {
      render(<Button loading>Label</Button>);

      const loadingIcon = screen.getByTestId(buttonTestIds.loadingIcon());
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).not.toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Secondary button', () => {
    it('should render secondary button correctly', () => {
      render(<Button variant="secondary">Label</Button>);

      expect(screen.getByTestId(buttonTestIds.secondary())).toBeInTheDocument();
    });

    it('should render loading secondary button correctly', () => {
      render(
        <Button variant="secondary" loading>
          Label
        </Button>,
      );

      const loadingIcon = screen.getByTestId(buttonTestIds.loadingIcon());
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).not.toHaveAttribute('aria-hidden', 'true');
    });
  });
});
