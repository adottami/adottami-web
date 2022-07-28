export interface PublicationFormData {
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
  hidePhoneNumber: string[];
  characteristics: string[];
}
