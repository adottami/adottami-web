import { GenderFemale, GenderMale } from 'phosphor-react';
import { FC, useMemo } from 'react';

interface Props {
  gender: string;
}

const Icon: FC<Props> = (props) => {
  const { gender } = props;

  if (gender.toLowerCase() === 'fêmea') {
    return <GenderFemale size={24} />;
  }

  return <GenderMale size={24} />;
};

const CardFooter: FC<Props> = (props) => {
  const { gender } = props;

  const color = useMemo(() => (gender.toLowerCase() === 'fêmea' ? 'tertiary-medium' : 'secondary-medium'), [gender]);

  return (
    <footer className="mt-2">
      <span className={`text-${color} flex w-fit items-center gap-2 rounded-full border-2 border-${color} px-3 py-2`}>
        <Icon gender={gender} />
        {gender}
      </span>
    </footer>
  );
};

export default CardFooter;
