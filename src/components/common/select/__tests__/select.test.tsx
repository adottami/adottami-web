import { render, screen } from '@testing-library/react';

import Select from '../select';

describe('Select', () => {
  it('should render a select component correctly, with the default value', () => {
    const defaultValue = 'Selecione';
    render(<Select />);
    expect(screen.getByText(defaultValue)).toBeInTheDocument();
  });

  it('should render a select component correctly, with a custom default value', () => {
    const defaultValue = 'Selecione a categoria';
    render(<Select defaultValue={defaultValue} />);
    expect(screen.getByText(defaultValue)).toBeInTheDocument();
  });

  it('should render a select component with label correctly', () => {
    const label = 'test_select_label';

    render(<Select label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render a select component with the required label correctly', () => {
    const label = 'test_select_label';

    render(<Select label={label} isRequired />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('should render a select component with an error message correctly', () => {
    const errorMessage = 'error-message';

    render(<Select errorMessage={errorMessage} hasError isRequired />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
