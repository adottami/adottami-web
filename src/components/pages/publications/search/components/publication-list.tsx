import { FC } from 'react';

import PublicationCard from '@/components/pages/components/publication-card/publication-card';
import Publication from '@/models/publication/publication';

interface Props {
  publications?: Publication[];
}

const PublicationList: FC<Props> = ({ publications }) => {
  return (
    <div className="flex w-full flex-col items-center gap-6 md:grid md:grid-cols-3">
      {publications &&
        publications.map((publication) => {
          return <PublicationCard publication={publication} />;
        })}
    </div>
  );
};

export default PublicationList;
