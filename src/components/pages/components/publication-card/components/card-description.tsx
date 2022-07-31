import { CalendarBlank, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  city: string;
  state: string;
  createdAt: Date;
}

const CardDescription: FC<Props> = (props) => {
  const { city, state, createdAt } = props;

  function getLocation() {
    return [city, state].join(', ');
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-2 font-medium text-neutral-800">
        <MapPinLine size={24} />
        {getLocation()}
      </div>
      <div className="flex items-center gap-2 font-medium text-neutral-800">
        <CalendarBlank size={24} />
        {createdAt.toLocaleDateString()}
      </div>
    </div>
  );
};

export default CardDescription;
