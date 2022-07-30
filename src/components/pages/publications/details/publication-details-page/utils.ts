import Publication from '@/models/publication/publication';

export function getPublicationDate(publication: Publication | null) {
  const publicationDate = publication !== null ? new Date(publication?.createdAt()) : null;

  if (publicationDate) {
    const formattedHours = publicationDate.getHours().toString().padStart(2, '0');
    const formattedMinutes = publicationDate.getMinutes().toString().padStart(2, '0');
    const day = publicationDate.getDay().toString().padStart(2, '0');
    const month = publicationDate.getMonth().toString().padStart(2, '0');
    return `${day}/${month} às ${formattedHours}:${formattedMinutes}`;
  }
}
