import Image from 'next/image';
import { FC, useState } from 'react';

import { imageProperties } from './constants';

const GridImages: FC = () => {
  const [mainPhoto, setMainPhoto] = useState(imageProperties[0].url);

  return (
    <div className="flex h-screen max-h-[32rem] w-full">
      <div className="relative h-full w-5/6 max-w-[44rem]">
        <Image
          src={mainPhoto}
          width={100}
          height={100}
          layout="fill"
          objectFit="initial"
          quality={100}
          priority
          className="rounded-pill"
        />
      </div>
      <div className="flex h-full flex-col justify-center gap-6 p-6">
        {imageProperties.map((image) => (
          <div className="relative h-20 w-20 cursor-pointer">
            <Image
              src={image.url}
              width={100}
              height={100}
              objectFit="initial"
              quality={100}
              priority
              className="rounded-pill"
              onClick={() => setMainPhoto(image.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridImages;
