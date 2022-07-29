import Image from 'next/image';
import { FC, useState } from 'react';

import { imageProperties } from './constants';

const GridImages: FC = () => {
  const [mainPhotoURL, setMainPhotoURL] = useState(imageProperties[0].url);

  return (
    <div className="flex h-screen max-h-[32rem] w-full">
      <div className="relative h-full w-5/6 max-w-[44rem]">
        <Image src={mainPhotoURL} layout="fill" objectFit="cover" quality={100} priority className="rounded-pill" />
      </div>
      <div className="flex h-full flex-col justify-center gap-6 p-6">
        {imageProperties.map((image) => (
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
