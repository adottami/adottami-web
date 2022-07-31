import { PUBLICATIONS_ENDPOINT } from './constants';

export function getPublicationEndpoint(publicationId: string): string {
  return `${PUBLICATIONS_ENDPOINT}/${publicationId}`;
}

export function getPublicationImagesEndpoint(publicationId: string): string {
  return `${getPublicationEndpoint(publicationId)}/images`;
}
