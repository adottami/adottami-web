import { FC } from 'react';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';

import CardDescription from './components/card-description';
import CardFooter from './components/card-footer';
import CardHeader from './components/card-header';
import CardSubheader from './components/card-subheader';

interface Props {
  publication: Publication;
}

const PublicationCard: FC<Props> = (props) => {
  const { publication } = props;
  const { name, images, city, state, breed, gender } = PublicationFactory.toResponse(publication);

  return (
    <div className="flex max-w-sm flex-col gap-y-2">
      <CardHeader images={images} />

      <div className="flex flex-col gap-y-2">
        <CardSubheader name={name} />

        <CardDescription breed={breed} city={city} state={state} />

        <CardFooter gender={gender} />
      </div>
    </div>
  );
};

export default PublicationCard;
