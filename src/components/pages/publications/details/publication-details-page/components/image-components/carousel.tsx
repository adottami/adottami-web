import Image from 'next/image';
import { CaretLeft, CaretRight } from 'phosphor-react';
import { FC, useState } from 'react';

import { imageProperties } from './constants';

const Carousel: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(imageProperties.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 > imageProperties.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex h-screen max-h-[26rem] w-full items-center md:max-h-[32rem]">
      <button className="absolute z-1" onClick={() => handlePrev()}>
        <CaretLeft size={30} />
      </button>
      <div className="relative h-full w-full max-w-[44rem]">
        <Image
          src={imageProperties[currentIndex].url}
          width={100}
          height={100}
          layout="fill"
          objectFit="initial"
          quality={100}
          priority
          className="z-0 rounded-pill"
        />
      </div>
      <button className="absolute right-6 z-1" onClick={() => handleNext()}>
        <CaretRight size={30} />
      </button>
    </div>
  );
};

export default Carousel;
