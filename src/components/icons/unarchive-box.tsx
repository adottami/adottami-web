import { FC } from 'react';

import { SVGSVGProps } from '@/types/html';

const UnarchiveBox: FC<SVGSVGProps> = ({ ...rest }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...rest}>
    <path
      d="M19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V6.75L5.25 3.75H18.75L20.25 6.75V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25Z"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 12.9282L12.1781 9.7501L15.3562 12.9282"
      stroke="#999999"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9.75V17.25" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3.75 6.75H20.25" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default UnarchiveBox;
