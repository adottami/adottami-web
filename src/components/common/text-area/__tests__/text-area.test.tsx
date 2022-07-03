import { render, screen } from '@testing-library/react';

import TextArea from '../text-area';

describe('Text area', () => {
  it('should render correctly', () => {
    render(<TextArea />);
    // ...
  });
  it('should render label correctly', () => {
    render(<TextArea label="Descrição" />);

    const textArea = screen.getByText('Descrição');
    expect(textArea).toBeInTheDocument();
  });
  it('should render star when required', () => {
    render(<TextArea label="Descrição" isRequired />);

    const start = screen.getByText('*');
    expect(start).toBeInTheDocument();
  });
});
