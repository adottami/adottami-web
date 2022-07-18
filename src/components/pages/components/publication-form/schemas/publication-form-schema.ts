import * as Yup from 'yup';

export const publicationFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  description: Yup.string().required('Descrição é obrigatória'),
  breed: Yup.string().required('Raça é obrigatória'),
  weightInGrams: Yup.string().required('Peso é obrigatório'),
  ageInYears: Yup.string().required('Idade é obrigatória'),
  zipCode: Yup.string().required('CEP é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
});
