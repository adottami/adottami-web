import { CalendarBlank, Camera, GenderFemale, Heart, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';

import { CardDescription, CardHeader, CardSubHeader } from './components';

interface Props {
  publication: Publication;
}

const PublicationCard: FC<Props> = (props) => {
  const { publication } = props;
  const { name, images, city, state, breed, gender } = PublicationFactory.toResponse(publication);

  return (
    <div>
      <CardHeader images={images} />

      <div>
        <CardSubHeader name={name} />

        <CardDescription breed={breed} city={city} state={state} />

        {/* CardFooter */}
        <footer>
          <span>
            <GenderFemale />
            {gender}
          </span>
        </footer>
      </div>
    </div>
  );
};

export default PublicationCard;
