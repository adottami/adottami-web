import * as Yup from 'yup';

export const loginAndSecurityFormSchema = Yup.object().shape({
  currentPassword: Yup.string().min(6, 'A senha deve conter no minimo 6 caracteres').required('Senha é obrigatória'),
  newPassword: Yup.string().min(6, 'A senha deve conter no minimo 6 caracteres').required('Nova senha é obrigatória'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});
