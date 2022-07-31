import { PublicationCharacteristic, PublicationResponse } from '@/models/publication/types';
import { withBaseAdottamiURL } from '@/services/adottami-client/utils';
import { TrackedRequest, trackRequests } from '@tests/utils/requests';

import { PUBLICATIONS_ENDPOINT, PUBLICATION_CHARACTERISTICS_ENDPOINT } from '../../constants';
import { getPublicationEndpoint, getPublicationImagesEndpoint } from '../../utils';

class PublicationResponseHandler {
  mockCreate(publicationResponse: PublicationResponse): TrackedRequest[] {
    const creationRequests = trackRequests(withBaseAdottamiURL(PUBLICATIONS_ENDPOINT), 'post', {
      responseData: publicationResponse,
    });
    return creationRequests;
  }

  mockGet(publicationResponses: PublicationResponse[]): TrackedRequest[] {
    const getRequests = trackRequests(withBaseAdottamiURL(PUBLICATIONS_ENDPOINT), 'get', {
      responseData: publicationResponses,
    });
    return getRequests;
  }

  mockGetById(publicationId: string, publicationResponse: PublicationResponse | null): TrackedRequest[] {
    const getRequests = trackRequests(withBaseAdottamiURL(getPublicationEndpoint(publicationId)), 'get', {
      responseData: publicationResponse,
    });
    return getRequests;
  }

  mockEdit(publicationId: string, publicationResponse: PublicationResponse): TrackedRequest[] {
    const getRequests = trackRequests(withBaseAdottamiURL(getPublicationEndpoint(publicationId)), 'patch', {
      responseData: publicationResponse,
    });
    return getRequests;
  }

  mockRemove(publicationId: string): TrackedRequest[] {
    const removeRequests = trackRequests(withBaseAdottamiURL(getPublicationEndpoint(publicationId)), 'delete');
    return removeRequests;
  }

  mockEditImages(publicationId: string): TrackedRequest[] {
    const editRequests = trackRequests(withBaseAdottamiURL(getPublicationImagesEndpoint(publicationId)), 'patch');
    return editRequests;
  }

  mockGetCharacteristics(characteristics: PublicationCharacteristic[]): TrackedRequest[] {
    const getRequests = trackRequests(withBaseAdottamiURL(PUBLICATION_CHARACTERISTICS_ENDPOINT), 'get', {
      responseData: characteristics,
    });
    return getRequests;
  }
}

const publicationResponseHandler = new PublicationResponseHandler();

export default publicationResponseHandler;
