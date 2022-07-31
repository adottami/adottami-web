import { FC } from 'react';

import CardMenu from './card-menu';

interface Props {
  publicationId: string;
  name: string;
  isVisible?: boolean;
}

const CardSubheader: FC<Props> = (props) => {
  const { name, isVisible, publicationId } = props;

  return (
    <div className="flex items-center justify-between gap-6">
      <h3 className="text-2xl font-bold">{name}</h3>
      <CardMenu isVisible={isVisible} publicationId={publicationId} />
    </div>
  );
};

export default CardSubheader;
