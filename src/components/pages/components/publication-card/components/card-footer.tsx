import { GenderFemale } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  gender: string;
}

const CardFooter: FC<Props> = (props) => {
  const { gender } = props;

  return (
    <footer>
      <span>
        <GenderFemale />
        {gender}
      </span>
    </footer>
  );
};

export default CardFooter;
