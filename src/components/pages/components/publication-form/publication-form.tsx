import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { EnvelopeSimple, Phone } from 'phosphor-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

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

import { TOAST_CONFIGS } from '../header/constants';
import PublicationFormFooter from './components/publication-form-footer/publication-form-footer';
import { CATEGORY_OPTIONS, GENDER_OPTIONS, INITIAL_VALUES } from './contants';
import { publicationFormSchema } from './schemas/publication-form-schema';
import { PublicationFormData } from './types';

interface Props {
  title: string;
  onSubmit: (values: CreatePublicationData) => Promise<Publication | undefined>;
  type: 'create' | 'edit';
  publicationId?: string;
  defaultPublication?: Publication;
}

const PublicationForm: FC<Props> = ({ title, type, onSubmit, publicationId }) => {
  const { user, isLoading } = useSession();
  const api = useApi();
  const router = useRouter();

  const [showErrors, setShowErrors] = useState<boolean>(false);
  const [publication, setPublication] = useState<Publication | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [gender, setGender] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [characteristics, setCharacteristics] = useState<PublicationCharacteristic[]>([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);
  const [characteristicsOptions, setCharacteristicsOptions] = useState<string[]>([]);

  const { values, errors, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: publicationFormSchema,
    onSubmit: async (values) => {
      const publication = await onSubmit(formatFieldsToRequestBody(values));
      await updatePublicationImages(publication);
    },
  });

  const hidePhoneNumberOptions: string[] = useMemo(
    () => (values.hidePhoneNumber ? ['Ocultar meu telefone neste anúncio'] : []),
    [values.hidePhoneNumber],
  );

  useEffect(() => {
    if (!user && !isLoading) {
      toast.error('Por favor, faça login para poder anunciar um pet', TOAST_CONFIGS);
      router.push(`/sign-in`);
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (type === 'edit') {
      if (publicationId !== undefined) {
        fetchPublication(publicationId);
      }
    }

    async function fetchPublication(id: string) {
      try {
        const publication = await api.adottami.publications.getById(id);
        setPublication(publication);
      } catch (error) {
        console.log(error);
      }
    }
  }, [api.adottami.publications, publicationId, type]);

  useEffect(() => {
    if (!publication) return;
    setGender(publication.gender());
    setCategory(publication.category());
    setImages(
      publication.images().map((image) => {
        return new File([], image.url);
      }),
    );
    setSelectedCharacteristics(publication.characteristics().map((characteristic) => characteristic.name));
    setFieldValue('name', publication.name());
    setFieldValue('description', publication.description());
    setFieldValue('breed', publication.breed());
    setFieldValue('weightInGrams', publication.weightInGrams());
    setFieldValue('ageInYears', publication.ageInYears());
    setFieldValue('zipCode', zipCode.applyMask(publication.zipCode()));
    setFieldValue('city', publication.city());
    setFieldValue('state', publication.state());
    setFieldValue('hidePhoneNumber', publication.hidePhoneNumber());
  }, [publication, setFieldValue]);

  useEffect(() => {
    if (!user) return;

    async function loadCharacteristics() {
      try {
        const response = await api.adottami.publications.getCharacteristics();
        setCharacteristics(response);
        setCharacteristicsOptions(response.map((characteristic) => characteristic.name));
      } catch {
        toast.error('Erro ao carregar as categorias', TOAST_CONFIGS);
      }
    }

    loadCharacteristics();
  }, [api, user]);

  async function updatePublicationImages(publication: Publication | undefined) {
    if (!publication?.id?.()) {
      return;
    }

    try {
      await api.adottami.publications.editImages(publication.id(), images);

      toast.success('Imagens publicadas com sucesso', TOAST_CONFIGS);
    } catch (error) {
      if (!(error instanceof AxiosError)) throw error;
      toast.error('Erro ao publicar as imagens da publicação', TOAST_CONFIGS);
    }
  }

  function formatFieldsToRequestBody(values: PublicationFormData) {
    const characteristicsId = selectedCharacteristics.map((characteristcName) => {
      const characteristicId = characteristics.find((char) => char.name === characteristcName)?.id ?? '';
      return { id: characteristicId };
    });

    const data: CreatePublicationData = {
      name: values.name,
      description: values.description,
      gender,
      category,
      breed: values.breed || null,
      weightInGrams: values.weightInGrams || null,
      ageInYears: values.ageInYears || null,
      zipCode: zipCode.undoMask(values.zipCode),
      city: values.city,
      state: values.state,
      isArchived: !!values.isArchived,
      hidePhoneNumber: values.hidePhoneNumber?.length === 1,
      characteristics: characteristicsId || [],
    };

    return data;
  }

  function handleChangeImages(images: File[]) {
    setImages(images);
  }

  const onHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowErrors(true);
    handleSubmit(event);
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
              onImageChange={handleChangeImages}
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
              value={category}
              isRequired
              onChange={setCategory}
              errorMessage={
                showErrors && (category === '' || category === 'Selecione') ? 'Categoria é obrigatorio' : ''
              }
            />

            <RadioGroup
              id="gender"
              name="gender"
              label="Sexo"
              options={GENDER_OPTIONS}
              value={gender}
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
                name="weightInGrams"
                type="number"
                label="Peso"
                placeholder="Ex: 1000g"
                value={values.weightInGrams || ''}
                onChange={handleChange}
                errorMessage={showErrors ? errors.weightInGrams : ''}
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
              value={selectedCharacteristics}
              onChange={setSelectedCharacteristics}
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
                  id="hidePhoneNumber"
                  name="hidePhoneNumber"
                  options={['Ocultar meu telefone neste anúncio']}
                  value={hidePhoneNumberOptions}
                  onChange={handleChange}
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
