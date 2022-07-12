import { Camera } from 'phosphor-react';
import { FC } from 'react';

import { PublicationImage } from '@/models/publication/types';

interface Props {
  images: PublicationImage[];
}

const CardHeader: FC<Props> = (props) => {
  const { images } = props;

  return (
    <header>
      <img src={images[0].url} alt="" />
      <div>
        <Camera />
        <span>{images.length} Foto(s)</span>
      </div>
    </header>
  );
};

export default CardHeader;
