import { FC } from 'react';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';

import { CardDescription, CardFooter, CardHeader, CardSubHeader } from './components';

interface Props {
  publication: Publication;
}

const PublicationCard: FC<Props> = (props) => {
  const { publication } = props;
  const { name, images, city, state, breed, gender } = PublicationFactory.toResponse(publication);

  return (
    <div className="flex flex-col gap-y-2">
      <CardHeader images={images} />

      <div>
        <CardSubHeader name={name} />

        <CardDescription breed={breed} city={city} state={state} />

        <CardFooter gender={gender} />
      </div>
    </div>
  );
};

export default PublicationCard;
