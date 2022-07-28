import Link from 'next/link';
import { FC } from 'react';

import Publication from '@/models/publication/publication';

import CardDescription from './components/card-description';
import CardFooter from './components/card-footer';
import CardHeader from './components/card-header';
import CardSubheader from './components/card-subheader';
import { LINK_TO_DETAILS_PAGE_LABEL } from './constants';
import { getTestId } from './utils';

interface Props {
  publication: Publication;
  isMenuVisible?: boolean;
}

const PublicationCard: FC<Props> = ({ publication, isMenuVisible }) => (
  <Link href={`/publications/details/${publication.id()}`}>
    <a
      aria-label={LINK_TO_DETAILS_PAGE_LABEL}
      className="flex max-w-sm flex-col gap-y-2"
      data-testid={getTestId({ publication, isMenuVisible })}
    >
      <CardHeader images={publication.images()} />
      <div className="flex flex-col gap-y-2">
        <CardSubheader name={publication.name()} isVisible={isMenuVisible} />
        <CardDescription breed={publication.breed()} city={publication.city()} state={publication.state()} />
        <CardFooter gender={publication.gender()} />
      </div>
    </a>
  </Link>
);

export default PublicationCard;
