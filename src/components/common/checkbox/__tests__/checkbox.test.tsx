import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Checkbox from '../checkbox';

const categories = [
  'Brincalhão',
  'Dócil',
  'Calmo',
  'Sociável',
  'Sociável com crianças',
  'Castrado',
  'Vacinado',
  'Vermifugado',
  'Vive bem em apartamento',
  'Vive bem em casa com quintal',
];

describe('Checkbox', () => {
  it('should render correctly', () => {
    const { getByText } = render(<Checkbox title="Características" options={categories} />);
    expect(getByText('Brincalhão')).toBeInTheDocument();
    expect(getByText('Dócil')).toBeInTheDocument();
    expect(getByText('Calmo')).toBeInTheDocument();
    expect(getByText('Sociável')).toBeInTheDocument();
    expect(getByText('Sociável com crianças')).toBeInTheDocument();
    expect(getByText('Castrado')).toBeInTheDocument();
    expect(getByText('Vacinado')).toBeInTheDocument();
    expect(getByText('Vermifugado')).toBeInTheDocument();
    expect(getByText('Vive bem em apartamento')).toBeInTheDocument();
    expect(getByText('Vive bem em casa com quintal')).toBeInTheDocument();
  });

  it('handles click correctly', async () => {
    const onChange = jest.fn();

    render(<Checkbox title="Características" options={categories} onChange={onChange} />);
    const user = userEvent.setup();

    const funny = screen.getByText('Brincalhão');
    const sweet = screen.getByText('Dócil');
    const calm = screen.getByText('Calmo');
    const sociable = screen.getByText('Sociável');
    const sociableWithKids = screen.getByText('Sociável com crianças');
    const castrated = screen.getByText('Castrado');
    const vaccinated = screen.getByText('Vacinado');
    const livesWellInApartment = screen.getByText('Vive bem em apartamento');
    const livesWellInHouseWithBackyard = screen.getByText('Vive bem em casa com quintal');

    [
      funny,
      sweet,
      calm,
      sociable,
      sociableWithKids,
      castrated,
      vaccinated,
      livesWellInApartment,
      livesWellInHouseWithBackyard,
    ].forEach((option) => {
      expect(option).toBeInTheDocument();
    });

    await user.click(sociable);
    expect(onChange).toHaveBeenCalledWith([sociable.textContent]);

    await user.click(funny);
    expect(onChange).toHaveBeenCalledWith([funny.textContent]);

    await user.click(livesWellInHouseWithBackyard);
    expect(onChange).toHaveBeenCalledWith([livesWellInHouseWithBackyard.textContent]);

    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
