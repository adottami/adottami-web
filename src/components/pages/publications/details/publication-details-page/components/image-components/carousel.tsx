import Image from 'next/image';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { FC, useState } from 'react';

import { PublicationImage } from '@/models/publication/types';

interface Props {
  images: PublicationImage[] | undefined;
}

const Carousel: FC<Props> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasImages = images !== undefined && images.length > 0;

  const handlePrevious = () => {
    if (hasImages) {
      if (currentImageIndex === 0) {
        setCurrentImageIndex(images.length - 1);
      } else {
        setCurrentImageIndex(currentImageIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (hasImages) {
      if (currentImageIndex + 1 > images.length - 1) {
        setCurrentImageIndex(0);
      } else {
        setCurrentImageIndex(currentImageIndex + 1);
      }
    }
  };

  return (
    <div className="flex h-screen max-h-[26rem] w-full items-center md:max-h-[32rem]">
      {hasImages ? (
        <>
          <button className="absolute z-1" onClick={() => handlePrevious()}>
            <CaretLeft size={30} />
          </button>
          <div className="relative h-full w-full">
            <Image
              src={images[currentImageIndex].url}
              layout="fill"
              objectFit="cover"
              quality={100}
              priority
              className="z-0 rounded-pill"
            />
          </div>
          <button className="absolute right-6 z-1 md:right-12" onClick={() => handleNext()}>
            <CaretRight size={30} />
          </button>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-md text-neutral-800">Nenhuma imagem foi fornecida</p>
        </div>
      )}
    </div>
  );
};

export default Carousel;
