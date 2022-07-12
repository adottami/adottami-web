import { CalendarBlank, Camera, GenderFemale, Heart, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';

import { CardHeader } from './components';

interface Props {
  publication: Publication;
}

const PublicationCard: FC<Props> = (props) => {
  const { publication } = props;
  const { name, images, city, state, breed, gender } = PublicationFactory.toResponse(publication);

  function getLocation() {
    return [city, state].join(', ');
  }

  return (
    <div>
      <CardHeader images={images} />

      <div>
        {/* CardSubHeader */}
        <div>
          <h3>{name}</h3>
          <span>
            <Heart />
          </span>
        </div>

        {/* CardDescription */}
        <div>
          <div>
            <MapPinLine />
            {getLocation()}
          </div>
          <div>
            <CalendarBlank />
            {breed}
          </div>
        </div>

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
