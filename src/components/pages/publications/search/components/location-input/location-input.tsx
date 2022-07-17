import { MagnifyingGlass } from 'phosphor-react';
import { FC, FormEvent, useEffect, useState } from 'react';

import Input from '@/components/common/input/input';

interface LocationProps {
  state: string;
  city: string;
}

const LOCATION_INITIAL_STATE = {
  state: '',
  city: '',
};

const LocationInput: FC = () => {
  const [locationValue, setLocationsValue] = useState<LocationProps>(LOCATION_INITIAL_STATE);

  useEffect(() => {}, [locationValue]);

  const handleSendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { state, city } = event.target as typeof event.target & {
      state: { value: string };
      city: { value: string };
    };

    setLocationsValue({ state: state.value, city: city.value });
  };

  return (
    <form onSubmit={handleSendForm} className="flex w-full flex-col gap-4 md:flex-row md:justify-between">
      <Input variant="searchLocation" placeholder="Estado" id="state" type="text" name="state" />
      <Input variant="searchLocation" placeholder="Cidade" id="city" type="text" name="city" />
      <button
        type="submit"
        className="flex h-[46px] w-full items-center justify-center gap-3 rounded-pill bg-positive-medium text-surface-primary focus:border-2 focus:border-black focus:outline-none md:h-[54px] md:w-32"
      >
        <MagnifyingGlass size={20} />
        <span className="text-sm  md:hidden md:text-md 2xl:text-md">Buscar</span>
      </button>
    </form>
  );
};

export default LocationInput;
