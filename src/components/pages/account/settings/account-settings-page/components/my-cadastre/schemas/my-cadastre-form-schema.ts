import * as Yup from 'yup';

export const myCadastreFormSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  phone: Yup.string(),
});
