import { FC } from 'react';

import { tableHeads, tableValues } from './constants';

interface Props {
  variant: 'details' | 'localization';
}

const Table: FC<Props> = ({ variant }) => (
  <div className="flex flex-wrap">
    {variant === 'details'
      ? tableHeads.details.map((value, index) => (
          <div key={value} className="mr-12 flex flex-col items-center justify-center">
            <p className="text-md font-normal text-neutral-500">{value}</p>
            <p className="text-center text-neutral-800">{tableValues.details[index]}</p>
          </div>
        ))
      : tableHeads.localization.map((value, index) => (
          <div key={value} className="mr-12 flex flex-col items-center justify-center">
            <p className="text-md font-normal text-neutral-500">{value}</p>
            <p className="text-center text-neutral-800">{tableValues.details[index]}</p>
          </div>
        ))}
  </div>
);

export default Table;
