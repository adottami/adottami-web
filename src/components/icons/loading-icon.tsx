import { FC } from 'react';

import { SVGSVGProps } from '@/types/html';

const LoadingIcon: FC<SVGSVGProps> = ({ ...rest }) => (
  <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M9.08334 2.45312C10.1205 2.92849 10.9638 3.74423 11.4734 4.76495C11.9831 5.78567 12.1283 6.94998 11.885 8.06461C11.6417 9.17924 11.0246 10.1772 10.136 10.8927C9.24744 11.6083 8.14087 11.9984 7.00001 11.9984C5.85914 11.9984 4.75258 11.6083 3.864 10.8927C2.97543 10.1772 2.35828 9.17924 2.115 8.06461C1.87173 6.94998 2.01695 5.78567 2.52657 4.76495C3.03619 3.74423 3.87955 2.92849 4.91667 2.45312"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default LoadingIcon;
