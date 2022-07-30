import axios from 'axios';

import globalConfig from '@/config/global-config/global-config';
import PublicationFactory from '@/models/publication/publication-factory';
import { PublicationCharacteristic, PublicationResponse } from '@/models/publication/types';

import { IMAGES_FORM_DATA_KEY } from '../constants';
import PublicationClient from '../publication-client';
import { CreatePublicationData, EditPublicationData, GetPublicationsOptions } from '../types';
import publicationResponseHandler from './mocks/publication-response-handler';

describe('Publication client', () => {
  const publicationClient = new PublicationClient(axios.create({ baseURL: globalConfig.baseAdottamiURL() }));

  const publicationResponse: PublicationResponse = {
    id: '1',
    name: 'Pet',
    description: 'My pet',
    category: 'Cat',
    gender: 'Male',
    breed: null,
    weightInGrams: null,
    ageInYears: null,
    zipCode: '00000000',
    city: 'City',
    state: 'State',
    isArchived: false,
    hidePhoneNumber: false,
    characteristics: [],
    images: [],
    author: {
      id: '1',
      name: 'User',
      email: 'user@email.com',
      phoneNumber: '1100001111',
    },
    createdAt: '2022-07-30T00:00:00.000Z',
  };

  const createPublicationData: CreatePublicationData = {
    name: publicationResponse.name,
    description: publicationResponse.description,
    category: publicationResponse.category,
    gender: publicationResponse.gender,
    breed: publicationResponse.breed,
    weightInGrams: publicationResponse.weightInGrams,
    ageInYears: publicationResponse.ageInYears,
    zipCode: publicationResponse.zipCode,
    city: publicationResponse.city,
    state: publicationResponse.state,
    isArchived: publicationResponse.isArchived,
    hidePhoneNumber: publicationResponse.hidePhoneNumber,
    characteristics: publicationResponse.characteristics,
  };

  it('should support creating a publication', async () => {
    const creationRequests = publicationResponseHandler.mockCreate(publicationResponse);

    const createdPublication = await publicationClient.create(createPublicationData);

    expect(creationRequests).toHaveLength(1);
    expect(creationRequests[0].body).toEqual(createPublicationData);

    const expectedCreatedPublication = PublicationFactory.createFromResponse(publicationResponse);
    expect(createdPublication).toEqual(expectedCreatedPublication);
  });

  it('should support getting publications', async () => {
    const publicationResponses = [publicationResponse, publicationResponse];

    const getRequests = publicationResponseHandler.mockGet(publicationResponses);

    const getOptions: GetPublicationsOptions = {
      city: 'City',
      state: 'State',
      categories: ['Category 1', 'Category 2'],
      isArchived: false,
      authorId: '1',
      page: 2,
      perPage: 30,
      orderBy: 'most-recently-created',
    };

    const publications = await publicationClient.get(getOptions);

    expect(getRequests).toHaveLength(1);
    expect(getRequests[0].query).toEqual({
      ...getOptions,
      categories: getOptions.categories?.join(','),
      isArchived: getOptions.isArchived?.toString(),
      page: getOptions.page?.toString(),
      perPage: getOptions.perPage?.toString(),
    });

    const expectedPublications = publicationResponses.map((response) =>
      PublicationFactory.createFromResponse(response),
    );
    expect(publications).toEqual(expectedPublications);
  });

  it('should support getting an existing publication by id', async () => {
    const getRequests = publicationResponseHandler.mockGetById(':publicationId', publicationResponse);

    const publication = await publicationClient.getById(publicationResponse.id);

    expect(getRequests).toHaveLength(1);
    expect(getRequests[0].params).toEqual({ publicationId: publicationResponse.id });

    const expectedPublication = PublicationFactory.createFromResponse(publicationResponse);
    expect(publication).toEqual(expectedPublication);
  });

  it('should support getting a non-existing publication by id', async () => {
    publicationResponseHandler.mockGetById(':publicationId', null);
    const publication = await publicationClient.getById(publicationResponse.id);
    expect(publication).toBe(null);
  });

  it('should support editing a publication', async () => {
    const editedPublicationResponse = {
      ...publicationResponse,
      name: 'New pet',
      description: 'My new pet',
    };

    const publicationData: EditPublicationData = {
      ...createPublicationData,
      name: editedPublicationResponse.name,
      description: editedPublicationResponse.description,
    };

    const editRequests = publicationResponseHandler.mockEdit(':publicationId', publicationResponse);

    const editPublication = await publicationClient.edit(publicationResponse.id, publicationData);

    expect(editRequests).toHaveLength(1);
    expect(editRequests[0].params).toEqual({ publicationId: publicationResponse.id });
    expect(editRequests[0].body).toEqual(publicationData);

    const expectedEditedPublication = PublicationFactory.createFromResponse(publicationResponse);
    expect(editPublication).toEqual(expectedEditedPublication);
  });

  it('should support editing the images of a publication', async () => {
    const editRequests = publicationResponseHandler.mockEditImages(':publicationId');

    const images = [new File([], 'image-1'), new File([], 'image-2')];

    await publicationClient.editImages(publicationResponse.id, images);

    expect(editRequests).toHaveLength(1);
    expect(editRequests[0].params).toEqual({ publicationId: publicationResponse.id });
    expect(editRequests[0].body).toBeInstanceOf(FormData);

    const formData = editRequests[0].body as FormData;
    expect(formData.getAll(IMAGES_FORM_DATA_KEY)).toEqual(images);
  });

  it('should support removing a publication', async () => {
    const removeRequests = publicationResponseHandler.mockRemove(':publicationId');

    await publicationClient.remove(publicationResponse.id);

    expect(removeRequests).toHaveLength(1);
    expect(removeRequests[0].params).toEqual({ publicationId: publicationResponse.id });
  });

  it('should support getting the available characteristics', async () => {
    const characteristics: PublicationCharacteristic[] = [
      { id: '1', name: 'Characteristic 1' },
      { id: '2', name: 'Characteristic 2' },
      { id: '3', name: 'Characteristic 3' },
    ];

    const getRequests = publicationResponseHandler.mockGetCharacteristics(characteristics);

    const receivedCharacteristics = await publicationClient.getCharacteristics();

    expect(getRequests).toHaveLength(1);
    expect(getRequests[0].query).toEqual({});

    expect(receivedCharacteristics).toEqual(characteristics);
  });
});
