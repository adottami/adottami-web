import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { PublicationImage } from '@/models/publication/types';

interface Props {
  images: PublicationImage[] | undefined;
}

const GridImages: FC<Props> = ({ images }) => {
  const hasImages = images !== undefined && images.length > 0;
  const [mainPhotoURL, setMainPhotoURL] = useState(hasImages ? images[0].url : '');

  useEffect(() => {
    if (hasImages) {
      setMainPhotoURL(images[0].url);
    }
  }, [images, hasImages]);

  return (
    <div className="flex h-screen max-h-[32rem] w-full">
      <div className="relative h-full w-5/6 max-w-[44rem]">
        {mainPhotoURL === '' ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-md text-neutral-800">Nenhuma imagem foi fornecida</p>
          </div>
        ) : (
          <Image src={mainPhotoURL} layout="fill" objectFit="cover" quality={100} priority className="rounded-pill" />
        )}
      </div>
      <div className="flex h-full flex-col justify-center gap-6 p-6">
        {images?.map((image) => (
          <div key={image.id} className="relative h-20 w-20 cursor-pointer">
            <Image
              src={image.url}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              className="rounded-pill"
              onClick={() => setMainPhotoURL(image.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridImages;
