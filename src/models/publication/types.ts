import { UserFields, UserResponse } from '../user/types';

export interface PublicationCharacteristic {
  id: string;
  name: string;
}

export interface PublicationImage {
  id: string;
  url: string;
}

export interface PublicationResponse {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  breed: string | null;
  weightInKilograms: number | null;
  ageInYears: number | null;
  zipCode: string;
  city: string;
  state: string;
  isArchived: boolean;
  characteristics: PublicationCharacteristic[];
  images: PublicationImage[];
  author: UserResponse;
}

export interface PublicationFields {
  id: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  breed: string | null;
  weightInKilograms: number | null;
  ageInYears: number | null;
  zipCode: string;
  city: string;
  state: string;
  isArchived: boolean;
  characteristics: PublicationCharacteristic[];
  images: PublicationImage[];
  author: UserFields;
}
