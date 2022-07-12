import { GenderFemale, GenderMale } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  gender: string;
}

const CardFooter: FC<Props> = (props) => {
  const { gender } = props;

  const { color, borderColor } =
    gender.toLowerCase() === 'fêmea'
      ? { color: 'text-tertiary-medium', borderColor: 'border-tertiary-medium' }
      : { color: 'text-secondary-medium', borderColor: 'border-secondary-medium' };

  return (
    <footer className="mt-2">
      <span className={`${color} ${borderColor} flex w-fit items-center gap-2 rounded-full border-2 px-3 py-2`}>
        {gender.toLowerCase() === 'fêmea' ? <GenderFemale size={24} /> : <GenderMale size={24} />}
        {gender}
      </span>
    </footer>
  );
};

export default CardFooter;
