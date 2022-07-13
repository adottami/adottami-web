import { FC } from 'react';

import Publication from '@/models/publication/publication';

import CardDescription from './components/card-description';
import CardFooter from './components/card-footer';
import CardHeader from './components/card-header';
import CardSubheader from './components/card-subheader';

interface Props {
  publication: Publication;
  isMenuVisible?: boolean;
}

const PublicationCard: FC<Props> = (props) => {
  const { publication, isMenuVisible } = props;

  return (
    <div className="flex max-w-sm flex-col gap-y-2">
      <CardHeader images={publication.images()} />

      <div className="flex flex-col gap-y-2">
        <CardSubheader name={publication.name()} isArchived={publication.isArchived()} isVisible={isMenuVisible} />

        <CardDescription breed={publication.breed()} city={publication.city()} state={publication.state()} />

        <CardFooter gender={publication.gender()} />
      </div>
    </div>
  );
};

export default PublicationCard;
