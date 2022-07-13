import { FC } from 'react';

import CardMenu from './card-menu';

interface Props {
  name: string;
  isArchived?: boolean;
  isVisible?: boolean;
}

const CardSubheader: FC<Props> = (props) => {
  const { name, isVisible, isArchived } = props;

  return (
    <div className="flex items-center justify-between gap-6">
      <h3 className="text-2xl font-bold">{name}</h3>
      <CardMenu isVisible={isVisible} isArchived={isArchived} />
    </div>
  );
};

export default CardSubheader;
