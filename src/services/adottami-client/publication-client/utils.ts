import { PUBLICATIONS_ENDPOINT } from './constants';

export function getPublicationEndpoint(publicationId: string) {
  return `${PUBLICATIONS_ENDPOINT}/${publicationId}`;
}
