import { RadioProps } from '@/components/common/radio-group/radio-input';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

type FormKeys = (keyof CreatePublicationData)[];

export const genderOptions = [
  { id: 'macho', label: 'Macho' },
  { id: 'fêmea', label: 'Fêmea' },
] as RadioProps[];

export const FeatureOptions = [
  'Brincalhão',
  'Dócil',
  'Calmo',
  'Sociável',
  'Sociável com crianças',
  'Castrado',
  'Vacinado',
  'Vermifugado',
  'Vive bem em apartamento',
  'Vive bem em casa com quintal',
] as string[];

export const InputKeys = [
  'name',
  'description',
  'breed',
  'weightInGrams',
  'ageInYears',
  'zipCode',
  'state',
  'city',
] as FormKeys;
