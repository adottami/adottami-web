import { EnvelopeSimple, Phone } from 'phosphor-react';
import React, { useImperativeHandle, useRef } from 'react';

import Checkbox from '@/components/common/checkbox/checkbox';
import FileInput from '@/components/common/file-input/file-input';
import Input from '@/components/common/input/input';
import RadioGroup from '@/components/common/radio-group/radio-group';
import TextArea from '@/components/common/text-area/text-area';
import { PublicationFields } from '@/models/publication/types';

import { FeatureOptions, genderOptions } from './contants';

interface Props {
  header: string;
  onSubmit(values: PublicationFields): void;
}

export interface PublicationFormRef {
  submit: (() => void) | undefined;
}

const PublicationForm = React.forwardRef<PublicationFormRef, Props>((props, ref) => {
  const { header, onSubmit } = props;

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      submit: formRef.current?.submit,
    }),
    [],
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="mb-8 mt-12">
        <h2 className="text-2xl font-bold text-primary-dark">{header}</h2>
        <p>As informações com (*) são obrigatórias</p>
      </div>

      <form
        ref={formRef}
        onSubmit={() => onSubmit({} as PublicationFields)}
        className="rounded-xl border-2 border-neutral-100 p-6"
      >
        <div className="flex flex-col gap-4 md:w-3/6">
          <FileInput label="Fotos" description={['Adicione até ', <b>5 fotos</b>]} variant="image" />

          <Input type="text" label="Nome" placeholder="Ex: Tom" isRequired />
          <TextArea type="text" label="Descrição" placeholder="Descreva a história do pet" isRequired />

          <RadioGroup id="0" label="Sexo" isRequired options={genderOptions} />

          <Input type="text" label="Raça" placeholder="Ex: Puddle" isRequired />

          <div className="flex gap-4">
            <Input type="text" label="Peso" placeholder="Ex: 10 Kg" isRequired />
            <Input type="text" label="Idade" placeholder="Ex: 5 meses" isRequired />
          </div>

          <Checkbox title="Características" options={FeatureOptions} />

          <div className="flex flex-col gap-4">
            <Input type="text" label="Localização" placeholder="CEP" isRequired />
            <Input type="text" placeholder="Estado" isRequired />
            <Input type="text" placeholder="Município" isRequired />
          </div>

          <div className="flex flex-col gap-4">
            <strong>Contato</strong>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-tertiary-medium p-2 text-white">
                <EnvelopeSimple size={20} />
              </span>
              matheus.oliveira@gmail.com
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-tertiary-medium p-2 text-white">
                  <Phone size={20} />
                </span>
                83987196021
              </div>
              <Checkbox options={['Ocultar meu telefone neste anúncio']} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});

export default PublicationForm;
