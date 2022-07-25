import { MagnifyingGlass } from 'phosphor-react';
import { FC, FormEvent } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';

import { Search } from '../search-publications-page/types';

interface Props {
  setSearchValues: (Func: (prevState: Search) => Search) => void;
}

const LocationInput: FC<Props> = ({ setSearchValues }) => {
  const handleSendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { state, city } = event.target as typeof event.target & {
      state: { value: string };
      city: { value: string };
    };

    setSearchValues((prevState) => ({ ...prevState, state: state.value, city: city.value }));
  };

  return (
    <form onSubmit={handleSendForm} className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
      <Input variant="searchLocation" placeholder="Estado" id="state" type="text" name="state" />
      <Input variant="searchLocation" placeholder="Cidade" id="city" type="text" name="city" />
      <Button type="submit" variant="positive" data-testid="search-button">
        <MagnifyingGlass size={20} />
        <span className="text-sm  md:hidden md:text-md 2xl:text-md">Buscar</span>
      </Button>
    </form>
  );
};

export default LocationInput;
