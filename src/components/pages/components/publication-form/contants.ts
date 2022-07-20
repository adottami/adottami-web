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
  'weightInGrams',
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
  { id: 'macho', label: 'Macho' },
  { id: 'fêmea', label: 'Fêmea' },
];

// this constant will be removed during integration phase
export const FEATURE_OPTIONS = [
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
];

// this constant will be removed during integration phase
export const CATEGORY_OPTIONS = ['cachorro', 'coelho', 'gato'];
