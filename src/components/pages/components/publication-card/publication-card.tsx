import { CalendarBlank, Camera, GenderFemale, Heart, MapPinLine } from 'phosphor-react';
import { FC } from 'react';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';

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
      <header>
        <img src={images[0].url} alt="" />
        <div>
          <Camera />
          <span>{images.length} Foto(s)</span>
        </div>
      </header>

      <div>
        <div>
          <h3>{name}</h3>
          <span>
            <Heart />
          </span>
        </div>

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
