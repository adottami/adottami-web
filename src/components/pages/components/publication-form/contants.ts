import { RadioProps } from '@/components/common/radio-group/radio-input';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

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
  'weightInKilograms',
  'ageInYears',
  'zipCode',
  'state',
  'city',
  'category',
  'gender',
];

export const INITIAL_VALUES = INPUT_KEYS.reduce(
  (accumulate, currentValue) => ({
    ...accumulate,
    [currentValue]: '',
  }),
  {} as CreatePublicationData,
);

export const GENDER_OPTIONS: RadioProps[] = [
  { value: 'Macho', label: 'Macho', isDisabled: false },
  { value: 'Fêmea', label: 'Fêmea', isDisabled: false },
];

// this constant will be removed during integration phase
export const CATEGORY_OPTIONS = ['Cachorro', 'Coelho', 'Gato'];
