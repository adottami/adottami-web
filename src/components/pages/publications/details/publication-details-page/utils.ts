import Publication from '@/models/publication/publication';

export function getPublicationDate(publication: Publication | null) {
  const publicationDate = publication !== null ? publication?.createdAt() : null;

  if (publicationDate) {
    return `${publicationDate.toLocaleDateString()} às ${publicationDate.toLocaleTimeString()}`;
  }
  return null;
}
