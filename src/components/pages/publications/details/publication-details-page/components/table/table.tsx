import { FC } from 'react';

import Publication from '@/models/publication/publication';

import { tableHeads } from './constants';

interface Props {
  publication: Publication | null;
  variant: 'details' | 'localization';
}

const Table: FC<Props> = ({ publication, variant }) => {
  const hasPublication = publication !== null;

  function getPublicationDetails(publication: Publication) {
    return [
      publication.category(),
      publication.gender(),
      publication.breed(),
      publication.weightInGrams(),
      publication.ageInYears(),
    ];
  }

  function getPublicationLocalization(publication: Publication) {
    return [publication.zipCode(), publication.state(), publication.city()];
  }

  const publicationDetails = hasPublication ? getPublicationDetails(publication) : [];
  const publicationLocalization = hasPublication ? getPublicationLocalization(publication) : [];

  return (
    <div className="flex flex-wrap">
      {variant === 'details'
        ? tableHeads.details.map((value, index) => (
            <div key={value} className="mr-12 flex flex-col items-center justify-center">
              <p className="text-md font-normal text-neutral-500">{value}</p>
              <p className="text-center text-neutral-800">
                {publicationDetails[index] !== null ? publicationDetails[index] : '-'}
              </p>
            </div>
          ))
        : tableHeads.localization.map((value, index) => (
            <div key={value} className="mr-12 flex flex-col items-center justify-center">
              <p className="text-md font-normal text-neutral-500">{value}</p>
              <p className="text-center text-neutral-800">{publicationLocalization[index]}</p>
            </div>
          ))}
    </div>
  );
};

export default Table;
