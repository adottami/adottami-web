export interface CreatePublicationData {
  name: string;
  description: string;
  category: string;
  gender: string;
  breed: string | null;
  weightInGrams: number | null;
  ageInYears: number | null;
  zipCode: string;
  city: string;
  state: string;
  isArchived: boolean;
  hidePhoneNumber: boolean;
  characteristics: Array<{ id: string }>;
}

export type EditPublicationData = Partial<CreatePublicationData>;

export interface GetPublicationsOptions {
  city?: string;
  state?: string;
  categories?: string[];
  isArchived?: boolean;
  authorId?: string;
  page?: number;
  perPage?: number;
  orderBy?: 'createdAt';
}
