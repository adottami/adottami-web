import { useFormik } from 'formik';
import { EnvelopeSimple, Phone } from 'phosphor-react';
import React, { FC, FormEventHandler, useState } from 'react';

import Checkbox from '@/components/common/checkbox/checkbox';
import FileInput from '@/components/common/file-input/file-input';
import Input from '@/components/common/input/input';
import RadioGroup from '@/components/common/radio-group/radio-group';
import Select from '@/components/common/select/select';
import TextArea from '@/components/common/text-area/text-area';
import Publication from '@/models/publication/publication';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';
import { zipCode } from '@/utils/mask';

import PublicationFormFooter from './components/publication-form-footer/publication-form-footer';
import { CATEGORY_OPTIONS, FEATURE_OPTIONS, GENDER_OPTIONS, INITIAL_VALUES } from './contants';
import { publicationFormSchema } from './schemas/publication-form-schema';

interface Props {
  title: string;
  onSubmit: (values: CreatePublicationData) => Promise<void>;
  type: 'create' | 'edit';
  defaultPublication?: Publication;
}

const PublicationForm: FC<Props> = (props) => {
  const { title, type, onSubmit } = props;

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const categoryDefaultValue = 'Selecione uma categoria';
  const [category, setCategory] = useState<string>(categoryDefaultValue);

  const [gender, setGender] = useState<string>('');

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: type === 'create' ? INITIAL_VALUES : normalizePreviousValues(),
    validationSchema: publicationFormSchema,
    onSubmit: (values) => {
      if (!gender || category === categoryDefaultValue) return;
      onSubmit({ ...normalizeValues(values), gender, category });
    },
  });

  // TODO: this function should be created on edit publication page task
  function normalizePreviousValues(): CreatePublicationData {
    return {} as CreatePublicationData;
  }

  function normalizeValues(values: CreatePublicationData): CreatePublicationData {
    const normalizedValues = Object.keys(values).reduce((accumulate, currentValue) => {
      const field = currentValue as keyof CreatePublicationData;
      return values[field]
        ? {
            ...accumulate,
            [currentValue]: values[field],
          }
        : accumulate;
    }, {} as CreatePublicationData);

    normalizedValues.zipCode = zipCode.undoMask(normalizedValues.zipCode);
    return normalizedValues;
  }

  const onHandleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    setShowErrors(true);
    handleSubmit(e);
  };

  function getInputProps(field: keyof CreatePublicationData, maskFunction?: (value: string) => string) {
    const value = values[field] as string;
    const formattedValue = typeof maskFunction === 'function' ? maskFunction(value) : value;

    return {
      id: field,
      name: field,
      value: formattedValue,
      errorMessage: showErrors ? (errors[field] as string) : '',
      onChange: handleChange,
    };
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      <div className="mb-8 mt-12">
        <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
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
              maxFiles={5}
            />

            <Input type="text" label="Nome" placeholder="Ex: Tom" isRequired {...getInputProps('name')} />

            <TextArea
              isRequired
              type="text"
              label="Descrição"
              placeholder="Descreva a história do pet"
              {...getInputProps('description')}
            />

            <Select
              hasError={category === categoryDefaultValue && showErrors}
              errorMessage="Categoria é obrigatória"
              label="Categoria"
              isRequired
              defaultValue={categoryDefaultValue}
              options={CATEGORY_OPTIONS}
              name="category"
              onChange={setCategory}
            />

            <RadioGroup
              label="Sexo"
              isRequired
              options={GENDER_OPTIONS}
              id="gender"
              onChange={setGender}
              errorMessage="Gênero é obrigatório"
              hasError={!gender && showErrors}
            />

            <Input maxLength={8} type="text" label="Raça" placeholder="Ex: Puddle" {...getInputProps('breed')} />

            <div className="flex gap-4">
              <Input type="text" label="Peso" placeholder="Ex: 10 Kg" {...getInputProps('weightInGrams')} />
              <Input type="text" label="Idade" placeholder="Ex: 5 meses" {...getInputProps('ageInYears')} />
            </div>

            <Checkbox
              handleChange={handleChange}
              name="characteristics"
              id="characteristics"
              title="Características"
              options={FEATURE_OPTIONS}
            />

            <div className="flex flex-col gap-4">
              <Input
                type="text"
                label="Localização"
                placeholder="CEP"
                isRequired
                {...getInputProps('zipCode', zipCode.applyMask)}
              />
              <Input type="text" placeholder="Estado" isRequired {...getInputProps('state')} />
              <Input type="text" placeholder="Cidade" isRequired {...getInputProps('city')} />
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
