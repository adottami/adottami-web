import * as Yup from 'yup';

import { zipCode } from '@/utils/mask';

export const publicationFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  breed: Yup.string().nullable(),
  weightInGrams: Yup.number().nullable(),
  ageInYears: Yup.number().nullable(),
  zipCode: Yup.string().matches(zipCode.regex, 'CEP inválido').required('CEP é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
});
