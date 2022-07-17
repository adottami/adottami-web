import * as yup from 'yup';

export const authenticationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().min(6, 'Senha deve ter no minimo 6 caracteres').required('Senha é obrigatória'),
});
