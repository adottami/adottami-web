import { FC } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';

import AccountSettingsSection from '../account-settings-section';
import DefaultSection from '../default-section';
import { DATA_TESTID, SECTION_TITLE } from './constants';

interface Props {}

const LoginAndSecurity: FC<Props> = () => {
  return (
    <DefaultSection
      data-testid={DATA_TESTID}
      title={SECTION_TITLE}
      description="Aumente a segurança e tenha o controle da sua conta"
    >
      <AccountSettingsSection
        title="Alteração de senha"
        description={[
          <p>Escolha uma senha forte que você não esteja usando em nenhum outro lugar.</p>,
          <p>Troque sua senha a cada 6 meses para aumentar a segurança da sua conta.</p>,
        ]}
      >
        <form className="flex flex-col gap-4">
          <Input label="Senha atual" placeholder="Digite sua senha atual" variant="password" isRequired />
          <Input
            label="Nova senha"
            placeholder="Digite sua nova senha"
            variant="password"
            description="6 ou mais caracteres"
            isRequired
          />
          <Input
            label="Confirmar nova senha"
            placeholder="Digite sua nova senha novamente"
            variant="password"
            description="6 ou mais caracteres"
            isRequired
          />

          <div className="mt-4">
            <Button type="submit">Enviar</Button>
          </div>
        </form>
      </AccountSettingsSection>
    </DefaultSection>
  );
};

export default LoginAndSecurity;
