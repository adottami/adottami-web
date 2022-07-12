import { Heart } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  name: string;
}

const CardHeader: FC<Props> = (props) => {
  const { name } = props;

  return (
    <div>
      <h3>{name}</h3>
      <span>
        <Heart />
      </span>
    </div>
  );
};

export default CardHeader;
