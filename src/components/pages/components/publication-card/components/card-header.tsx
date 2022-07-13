import { Camera } from 'phosphor-react';
import { FC } from 'react';

import { PublicationImage } from '@/models/publication/types';

interface Props {
  images: PublicationImage[];
}

const CardHeader: FC<Props> = (props) => {
  const { images } = props;

  return (
    <header
      className="relative h-72 w-full max-w-sm rounded-xl bg-cover bg-center"
      style={{ backgroundImage: `url(${images[0].url})` }}
    >
      <div className="absolute bottom-0 left-0 flex items-center items-center gap-2 rounded-tr-xl rounded-bl-xl border-2 border-solid border-neutral-100 bg-surface-secondary p-2 text-xs font-medium text-neutral-800">
        <Camera size={20} />
        <span className="leading-3">{images.length} Foto(s)</span>
      </div>
    </header>
  );
};

export default CardHeader;
