import { render, screen } from '@testing-library/react';

import RadioGroup from '../radio-group';

describe('Radio Group', () => {
  it('should have radio input disabled correctly', () => {
    render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { id: 'macho', label: 'Macho', isDisabled: true },
          { id: 'femea', label: 'Fêmea' },
        ]}
      />,
    );
    const radio = screen.getByLabelText('Macho');
    expect(radio).toBeDisabled();
  });

  it('should render list options', () => {
    const { getByText } = render(
      <RadioGroup
        id="sexo"
        label="Sexo"
        options={[
          { id: 'macho', label: 'Macho', isDisabled: true },
          { id: 'femea', label: 'Fêmea' },
        ]}
      />,
    );

    expect(getByText('Macho')).toBeInTheDocument();
    expect(getByText('Fêmea')).toBeInTheDocument();
  });
});
