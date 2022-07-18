import { Check } from 'phosphor-react';
import { FC } from 'react';

import Button from '@/components/common/button/button';
import InlineLink from '@/components/common/inline-link/inline-link';
import Input from '@/components/common/input/input';
import Separator from '@/components/common/separator/separator';

import Box from '../box';
import DefaultSection from '../default-section';

interface Props {}

const MyCadastre: FC<Props> = () => {
  const accountOptions = [
    {
      label: 'E-mail',
      value: 'matheus.oliveira@gmail.com',
      isVerified: true,
      buttonLabel: 'Alterar',
      onClick: () => console.log('cliquei em alterar'),
    },
    {
      label: 'Google',
      value: 'Desconectado',
      isVerified: false,
      buttonLabel: 'Conectar',
      onClick: () => console.log('cliquei em conectar'),
    },
  ];

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
      <Box>
        {accountOptions.map((account, index) => (
          <>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <strong>{account.label}</strong>
                <p>{account.value}</p>
                {account.isVerified && (
                  <span className="flex gap-2 text-positive-medium">
                    <Check size={24} />
                    verificado
                  </span>
                )}
              </div>

              <InlineLink href="/">{account.buttonLabel}</InlineLink>
            </div>
            {index < accountOptions.length - 1 && (
              <div className="my-8">
                <Separator />
              </div>
            )}
          </>
        ))}
      </Box>
    </DefaultSection>
  );
};

export default MyCadastre;
