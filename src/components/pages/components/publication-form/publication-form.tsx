import { useFormik } from 'formik';
import { EnvelopeSimple, Phone } from 'phosphor-react';
import React, { FC, useEffect, useState } from 'react';

import Checkbox from '@/components/common/checkbox/checkbox';
import FileInput from '@/components/common/file-input/file-input';
import Input from '@/components/common/input/input';
import RadioGroup from '@/components/common/radio-group/radio-group';
import Select from '@/components/common/select/select';
import TextArea from '@/components/common/text-area/text-area';
import useApi from '@/hooks/api/use-api/use-api';
import useSession from '@/hooks/session/use-session/use-session';
import Publication from '@/models/publication/publication';
import { PublicationCharacteristic } from '@/models/publication/types';
import { CreatePublicationData } from '@/services/adottami-client/publication-client/types';
import { zipCode } from '@/utils/mask';

import PublicationFormFooter from './components/publication-form-footer/publication-form-footer';
import { CATEGORY_OPTIONS, GENDER_OPTIONS, INITIAL_VALUES } from './contants';
import { publicationFormSchema } from './schemas/publication-form-schema';

interface Props {
  title: string;
  onSubmit: (values: CreatePublicationData) => Promise<void>;
  type: 'create' | 'edit';
  defaultPublication?: Publication;
}

const PublicationForm: FC<Props> = ({ title, type, onSubmit }) => {
  const { user } = useSession();
  const api = useApi();

  const [showErrors, setShowErrors] = useState<boolean>(false);

  const [gender, setGender] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [characteristics, setCharacteristics] = useState<PublicationCharacteristic[]>([]);
  const [characteristicsOptions, setCharacteristicsOptions] = useState<string[]>([]);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: type === 'create' ? INITIAL_VALUES : INITIAL_VALUES,
    validationSchema: publicationFormSchema,
    onSubmit: (values) => {
      onSubmit(formatFieldsToRequestBody(values));
    },
  });

  useEffect(() => {
    async function loadCharacteristics() {
      try {
        const response = await api.adottami.publications.getCharacteristics();
        setCharacteristics(response);
        setCharacteristicsOptions(response.map((characteristic) => characteristic.name));
      } catch (error) {
        console.error(error);
      }
    }

    loadCharacteristics();
  }, [api]);

  function formatFieldsToRequestBody(values: CreatePublicationData) {
    const characteristicsIds = values.characteristics.map((characteristc) => {
      const formCharacteristic = characteristc as unknown as string;
      const characteristicId = characteristics.find((char) => char.name === formCharacteristic)?.id as string;

      return { id: characteristicId };
    });

    const data: CreatePublicationData = {
      name: values.name,
      description: values.description,
      gender,
      category,
      breed: values.breed || null,
      weightInKilograms: values.weightInKilograms || null,
      ageInYears: values.ageInYears || null,
      zipCode: zipCode.undoMask(values.zipCode),
      city: values.city,
      state: values.state,
      isArchived: !!values.isArchived,
      hidePhoneNumber: Boolean(values.hidePhoneNumber?.toString()),
      characteristics: characteristicsIds,
    };

    return data;
  }

  const onHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(e);
  };

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
              name="images"
              label="Fotos"
              variant="image"
              description={[
                <React.Fragment key="first">Adicione até </React.Fragment>,
                <strong key="second">5 fotos</strong>,
              ]}
              maxFiles={5}
            />

            <Input
              name="name"
              type="text"
              label="Nome"
              placeholder="Ex: Tom"
              value={values.name}
              isRequired
              errorMessage={showErrors ? errors.name : ''}
              onChange={handleChange}
            />

            <TextArea
              name="description"
              type="text"
              label="Descrição"
              placeholder="Descreva a história do pet"
              value={values.description}
              isRequired
              errorMessage={showErrors ? errors.description : ''}
              onChange={handleChange}
            />

            <Select
              name="category"
              label="Categoria"
              options={CATEGORY_OPTIONS}
              isRequired
              onChange={setCategory}
              errorMessage={showErrors && category === '' ? 'Categoria é obrigatorio' : ''}
            />

            <RadioGroup
              id="gender"
              name="gender"
              label="Sexo"
              options={GENDER_OPTIONS}
              isRequired
              errorMessage={showErrors && gender === '' ? 'Sexo é obrigatorio' : ''}
              onChange={setGender}
            />

            <Input
              name="breed"
              type="text"
              label="Raça"
              placeholder="Ex: Puddle"
              value={values.breed || ''}
              onChange={handleChange}
              errorMessage={showErrors ? errors.breed : ''}
            />

            <div className="flex gap-4">
              <Input
                name="weightInKilograms"
                type="number"
                label="Peso"
                placeholder="Ex: 10 Kg"
                value={values.weightInKilograms || ''}
                onChange={handleChange}
                errorMessage={showErrors ? errors.weightInKilograms : ''}
              />
              <Input
                name="ageInYears"
                type="number"
                label="Idade"
                placeholder="Ex: 5 anos"
                value={values.ageInYears || ''}
                onChange={handleChange}
                errorMessage={showErrors ? errors.breed : ''}
              />
            </div>

            <Checkbox
              name="characteristics"
              id="characteristics"
              title="Características"
              options={characteristicsOptions}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-4">
              <Input
                name="zipCode"
                type="text"
                label="Localização"
                placeholder="CEP"
                value={zipCode.applyMask(values.zipCode)}
                isRequired
                onChange={handleChange}
                errorMessage={showErrors ? errors.zipCode : ''}
              />
              <Input
                name="state"
                type="text"
                placeholder="Estado"
                value={values.state}
                isRequired
                onChange={handleChange}
                errorMessage={showErrors ? errors.state : ''}
              />
              <Input
                name="city"
                type="text"
                placeholder="Cidade"
                value={values.city}
                isRequired
                onChange={handleChange}
                errorMessage={showErrors ? errors.city : ''}
              />
            </div>

            <div className="flex flex-col gap-4">
              <strong>Contato</strong>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-tertiary-medium p-2 text-white">
                  <EnvelopeSimple size={20} />
                </span>
                {user ? user.email() : ''}
              </div>

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-tertiary-medium p-2 text-white">
                    <Phone size={20} />
                  </span>
                  {user ? user.phoneNumber() : ''}
                </div>
                <Checkbox
                  name="hidePhoneNumber"
                  options={['Ocultar meu telefone neste anúncio']}
                  onChange={handleChange}
                  errorMessage={showErrors ? errors.hidePhoneNumber : ''}
                />
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
