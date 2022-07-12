import { CalendarBlank, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

import { FCC } from '@/types/react';

interface Props {
  city: string;
  state: string;
  breed: string | null;
}

const Info: FCC = ({ children }) => {
  return <div className="flex items-center gap-2 font-medium text-neutral-800">{children}</div>;
};

const CardDescription: FC<Props> = (props) => {
  const { city, state, breed } = props;

  function getLocation() {
    return [city, state].join(', ');
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Info>
        <MapPinLine size={24} />
        {getLocation()}
      </Info>
      <Info>
        <CalendarBlank size={24} />
        {breed}
      </Info>
    </div>
  );
};

export default CardDescription;
