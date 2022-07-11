import { render, screen } from '@testing-library/react';

import FileInput from '../file-input';

describe('File Input', () => {
  describe('Variant Image File Input', () => {
    it('should not show preview if no image has been selected', () => {
      render(<FileInput />);
      expect(screen.queryByTestId('fileImage')).not.toBeInTheDocument();
    });
    it('should render label correctly', () => {
      render(<FileInput variant="image" label="Some Label" />);

      const fileInput = screen.getByText('Some Label');

      expect(fileInput).toBeInTheDocument();
    });
    it('should render description correctly', () => {
      render(<FileInput variant="image" description="Some Description" label="Some Label" />);

      const description = screen.getByText('Some Description');

      expect(description).toBeInTheDocument();
    });
  });
});
