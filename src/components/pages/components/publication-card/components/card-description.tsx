import { CalendarBlank, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  city: string;
  state: string;
  breed: string | null;
}

const CardDescription: FC<Props> = (props) => {
  const { city, state, breed } = props;

  function getLocation() {
    return [city, state].join(', ');
  }

  return (
    <div>
      <div>
        <MapPinLine />
        {getLocation()}
      </div>
      <div>
        <CalendarBlank />
        {breed}
      </div>
    </div>
  );
};

export default CardDescription;
