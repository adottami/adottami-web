import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('Email é obrigatório'),
  telephone: Yup.string()
    .length(14, 'Telefone inválido')

    .required('Telefone é obrigatório'),
  password: Yup.string().min(6, 'A senha deve conter no minimo 6 caracteres').required('Senha é obrigatória'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});
