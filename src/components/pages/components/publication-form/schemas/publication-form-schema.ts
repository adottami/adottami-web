import * as Yup from 'yup';

export const publicationFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  breed: Yup.string(),
  weightInGrams: Yup.string(),
  ageInYears: Yup.string(),
  zipCode: Yup.string().length(9, 'CEP inválido').required('CEP é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
});
