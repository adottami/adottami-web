import { render, screen } from '@testing-library/react';

import Separator from '../separator';

describe('Separator', () => {
  it('should render correctly', () => {
    const testId = 'testId';
    render(<Separator testId={testId} />);

    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should render correctly with children', () => {
    render(<Separator>ou</Separator>);

    expect(screen.getByText('ou')).toBeInTheDocument();
  });
});
