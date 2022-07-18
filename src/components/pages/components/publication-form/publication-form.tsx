import { useFormik } from 'formik';
import { EnvelopeSimple, Phone } from 'phosphor-react';
import React, { FC, FormEventHandler, useState } from 'react';

import Checkbox from '@/components/common/checkbox/checkbox';
import FileInput from '@/components/common/file-input/file-input';
import Input from '@/components/common/input/input';
import TextArea from '@/components/common/text-area/text-area';
import Publication from '@/models/publication/publication';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';

import PublicationFormFooter from '../publication-form-footer/publication-form-footer';
import { FeatureOptions, InputKeys } from './contants';
import { publicationFormSchema } from './schemas/publication-form-schema';

interface Props {
  header: string;
  onSubmit: (values: CreatePublicationData) => Promise<void>;
  type: 'create' | 'edit';
  previousValues?: Publication;
}

const PublicationForm: FC<Props> = (props) => {
  const { header, type, onSubmit } = props;
  const [showErrors, setShowErrors] = useState<boolean>(false);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: loadInitialValues(),
    validationSchema: publicationFormSchema,
    onSubmit: async (values) => onSubmit({ ...clearEmptyValues(values) }),
  });

  function createEmptyValues(): CreatePublicationData {
    return InputKeys.reduce(
      (accumulate, currentValue) => ({
        ...accumulate,
        [currentValue]: '',
      }),
      {} as CreatePublicationData,
    );
  }

  function clearEmptyValues(values: CreatePublicationData): CreatePublicationData {
    return Object.keys(values).reduce((accumulate, currentValue) => {
      const field = currentValue as keyof CreatePublicationData;
      return values[field]
        ? {
            ...accumulate,
            [currentValue]: values[field],
          }
        : accumulate;
    }, {} as CreatePublicationData);
  }

  // TODO: this function should be created on edit publication page task
  function createLoadedValues(): CreatePublicationData {
    return {} as CreatePublicationData;
  }

  function loadInitialValues() {
    return type === 'create' ? createEmptyValues() : createLoadedValues();
  }

  const onHandleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setShowErrors(true);
    handleSubmit(e);
  };

  function getInputProps(field: keyof CreatePublicationData) {
    return {
      id: field,
      name: field,
      value: values[field] as string,
      errorMessage: showErrors ? (errors[field] as string) : '',
      onChange: handleChange,
    };
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="mb-8 mt-12">
        <h2 className="text-2xl font-bold text-primary-dark">{header}</h2>
        <p>As informações com (*) são obrigatórias</p>
      </div>

      <form noValidate onSubmit={onHandleSubmit}>
        <div className="rounded-xl border-2 border-neutral-100 p-6">
          <div className="flex flex-col gap-4 md:w-3/6">
            <FileInput
              label="Fotos"
              description={[
                <React.Fragment key="first">Adicione até </React.Fragment>,
                <strong key="second">5 fotos</strong>,
              ]}
              variant="image"
              name="images"
            />

            <Input type="text" label="Nome" placeholder="Ex: Tom" isRequired {...getInputProps('name')} />

            <TextArea
              isRequired
              type="text"
              label="Descrição"
              placeholder="Descreva a história do pet"
              {...getInputProps('description')}
            />

            {/* TODO: the select component is missing */}

            {/* TODO: fix RadioGroup usage because usage is breaking tests on this page and I don't know why */}
            {/* <RadioGroup id="gender" name="gender" label="Sexo" isRequired options={genderOptions} /> */}

            <Input type="text" label="Raça" placeholder="Ex: Puddle" {...getInputProps('breed')} />

            <div className="flex gap-4">
              <Input type="text" label="Peso" placeholder="Ex: 10 Kg" {...getInputProps('weightInGrams')} />
              <Input type="text" label="Idade" placeholder="Ex: 5 meses" {...getInputProps('ageInYears')} />
            </div>

            <Checkbox title="Características" options={FeatureOptions} />

            <div className="flex flex-col gap-4">
              <Input type="text" label="Localização" placeholder="CEP" isRequired {...getInputProps('zipCode')} />
              <Input type="text" placeholder="Estado" isRequired {...getInputProps('state')} />
              <Input type="text" placeholder="Município" isRequired {...getInputProps('city')} />
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
        </div>

        <PublicationFormFooter type={type} />
      </form>
    </div>
  );
};

export default PublicationForm;
