import { AxiosInstance } from 'axios';

import Publication from '@/models/publication/publication';
import PublicationFactory from '@/models/publication/publication-factory';
import { PublicationCharacteristic, PublicationResponse } from '@/models/publication/types';

import { IMAGES_FORM_DATA_KEY, PUBLICATIONS_ENDPOINT, PUBLICATION_CHARACTERISTICS_ENDPOINT } from './constants';
import { CreatePublicationData, EditPublicationData, GetPublicationsOptions } from './types';
import { getPublicationEndpoint } from './utils';

class PublicationClient {
  constructor(private api: AxiosInstance) {}

  async create(publicationData: CreatePublicationData): Promise<Publication> {
    const { data: createdPublicationResponse } = await this.api.post<PublicationResponse>(
      PUBLICATIONS_ENDPOINT,
      publicationData,
    );
    const createdPublication = PublicationFactory.createFromResponse(createdPublicationResponse);
    return createdPublication;
  }

  async get(options: GetPublicationsOptions): Promise<Publication[]> {
    const { data: publicationResponses } = await this.api.get<PublicationResponse[]>(PUBLICATIONS_ENDPOINT, {
      params: {
        city: options.city,
        state: options.state,
        categories: options.categories?.join(','),
        isArchived: options.isArchived,
        authorId: options.authorId,
        page: options.page,
        perPage: options.perPage,
        orderBy: options.orderBy,
      },
    });

    const publications = publicationResponses.map((response) => PublicationFactory.createFromResponse(response));
    return publications;
  }

  async getById(publicationId: string): Promise<Publication | null> {
    const { data: publicationResponse } = await this.api.get<PublicationResponse | null>(
      getPublicationEndpoint(publicationId),
    );

    const publication = publicationResponse ? PublicationFactory.createFromResponse(publicationResponse) : null;
    return publication;
  }

  async edit(publicationId: string, publicationData: EditPublicationData): Promise<Publication> {
    const { data: editedPublicationResponse } = await this.api.patch<PublicationResponse>(
      getPublicationEndpoint(publicationId),
      publicationData,
    );
    const editedPublication = PublicationFactory.createFromResponse(editedPublicationResponse);
    return editedPublication;
  }

  async editImages(publicationId: string, images: File[]) {
    const formData = this.createImageFormData(images);

    await this.api.patchForm(getPublicationEndpoint(publicationId), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  }

  private createImageFormData(images: File[]) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append(IMAGES_FORM_DATA_KEY, image);
    });
    return formData;
  }

  async remove(publicationId: string) {
    await this.api.delete(getPublicationEndpoint(publicationId));
  }

  async getCharacteristics(): Promise<PublicationCharacteristic[]> {
    const { data: characteristics } = await this.api.get<PublicationCharacteristic[]>(
      PUBLICATION_CHARACTERISTICS_ENDPOINT,
    );
    return characteristics;
  }
}

export default PublicationClient;
