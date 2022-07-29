import Image from 'next/image';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { FC, useState } from 'react';

import { imageProperties } from './constants';

const Carousel: FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(imageProperties.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentImageIndex + 1 > imageProperties.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  return (
    <div className="flex h-screen max-h-[26rem] w-full items-center md:max-h-[32rem]">
      <button className="absolute z-1" onClick={() => handlePrevious()}>
        <CaretLeft size={30} />
      </button>
      <div className="relative h-full w-full">
        <Image
          src={imageProperties[currentImageIndex].url}
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
    </div>
  );
};

export default Carousel;
