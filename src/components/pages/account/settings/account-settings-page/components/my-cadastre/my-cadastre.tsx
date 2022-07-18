import { FC } from 'react';

import Button from '@/components/common/button/button';
import Input from '@/components/common/input/input';

import Box from '../box';
import DefaultSection from '../default-section';

interface Props {}

const MyCadastre: FC<Props> = () => {
  return (
    <DefaultSection title="Meu cadastro" description="Configure o seu cadastro.">
      <Box title="Dados da conta">
        <form className="flex flex-col gap-4">
          <Input label="Nome completo" isRequired />
          <Input label="Telefone" isRequired />

          <div className="mt-4">
            <Button type="submit">Salvar alterações</Button>
          </div>
        </form>
      </Box>
      <Box>teste</Box>
    </DefaultSection>
  );
};

export default MyCadastre;
