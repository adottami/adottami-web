import { Heart } from 'phosphor-react';
import { FC } from 'react';

interface Props {
  name: string;
}

const CardHeader: FC<Props> = (props) => {
  const { name } = props;

  return (
    <div className="flex items-center justify-between gap-6">
      <h3 className="text-2xl font-bold">{name}</h3>
      <span className="rounded-xl border-2 border-neutral-100 bg-surface-secondary p-2 text-neutral-800">
        <Heart size={24} />
      </span>
    </div>
  );
};

export default CardHeader;
