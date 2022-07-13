import Publication from '@/models/publication/publication';

import { publicationCardTestIds } from './__tests__/test-ids';

interface GetTestIdProps {
  isMenuVisible?: boolean;
  publication: Publication;
}

export const getTestId = ({ publication, isMenuVisible }: GetTestIdProps) => {
  if (isMenuVisible) {
    return publication.isArchived() ? publicationCardTestIds.menuIconArchived() : publicationCardTestIds.menuIcon();
  }
  return publication.gender().toLowerCase() === 'fêmea'
    ? publicationCardTestIds.female()
    : publicationCardTestIds.male();
};
