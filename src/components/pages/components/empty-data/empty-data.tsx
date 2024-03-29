import { FC } from 'react';

import PawIcon from '@/components/icons/paw-icon';

interface Props {
  message: string;
}

const EmptyData: FC<Props> = ({ message }) => (
  <div className="flex h-[380px] w-[300px] flex-col items-center justify-center rounded-xl border-2 border-neutral-100 bg-surface-primary lg:h-[400px] lg:w-full">
    <PawIcon />
    <p className="pt-9 text-center text-lg font-bold md:text-xl ">{message}</p>
  </div>
);

export default EmptyData;
