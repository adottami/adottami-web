import { RadioProps } from '@/components/common/radio-group/radio-input';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

import { PublicationFormData } from './types';

type FormKey = keyof CreatePublicationData;

export const FORM_LABELS = [
  'Fotos',
  'Nome',
  'Descrição',
  'Categoria',
  'Sexo',
  'Raça',
  'Peso',
  'Idade',
  'Características',
  'Localização',
  'Contato',
];

export const INPUT_KEYS: FormKey[] = [
  'name',
  'description',
  'breed',
  'weightInGrams',
  'ageInYears',
  'zipCode',
  'state',
  'city',
  'category',
  'gender',
];

export const INITIAL_VALUES: PublicationFormData = INPUT_KEYS.reduce(
  (accumulate, currentValue) => ({
    ...accumulate,
    [currentValue]: '',
  }),
  {} as PublicationFormData,
);

export const GENDER_OPTIONS: RadioProps[] = [
  { value: 'Macho', label: 'Macho', isDisabled: false },
  { value: 'Fêmea', label: 'Fêmea', isDisabled: false },
];

export const CATEGORY_OPTIONS = ['Cachorro', 'Gato', 'Coelho', 'Hamster', 'Passaro', 'Peixe', 'Outros'];
