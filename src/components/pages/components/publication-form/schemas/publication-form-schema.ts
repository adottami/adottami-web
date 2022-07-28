import * as Yup from 'yup';

import { zipCode } from '@/utils/mask';

export const publicationFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  breed: Yup.string(),
  weightInGrams: Yup.number(),
  ageInYears: Yup.number(),
  zipCode: Yup.string().matches(zipCode.regex, 'CEP inválido').required('CEP é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
});
