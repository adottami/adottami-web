import { Label } from '@radix-ui/react-label';
import Image from 'next/image';
import { Camera, X, XCircle } from 'phosphor-react';
import React, { FC, useEffect, useRef, useState } from 'react';

interface Props extends React.HTMLProps<HTMLInputElement> {
  variant?: string;
  onImageChange?: (files: File[]) => void;
  description?: string;
  maxFiles?: number;
}

const FileInput: FC<Props> = ({
  variant,
  label,
  onImageChange,
  description,
  maxFiles,
  required,
  disabled,
  ...rest
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [imageInputIsDisabled, setImageInputIsDisabled] = useState(false);
  const [errorMessageOnImageInput, setErrorMessageOnImageInput] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

  /*
  About getting files in parent component on 'image' switch case, use onImageChange prop with a setUseState in
  parent component and this useEffect function below will make sure you have selectedFiles list, selected by
  user, in parent component

  make sure that parent component be similar something like this:

  const ParentComponent: FC = () => {
    const [files, setFiles] = useState<File[]>();

    function handleImageChange(files: File[]) {
      setFiles(files);
    }

    return (
      <FileInput variant="image" onImageChange={handleImageChange}/>
    );
  }
  */
  useEffect(() => {
    if (onImageChange) {
      onImageChange(selectedFiles);
    }
  }, [selectedFiles, onImageChange]);

  useEffect(() => {
    if (maxFiles && selectedFiles.length >= maxFiles) {
      setImageInputIsDisabled(true);
    } else {
      setImageInputIsDisabled(false);
    }
  }, [selectedFiles, maxFiles]);

  const imageHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (maxFiles && files.length + selectedFiles.length > maxFiles) {
      setErrorMessageOnImageInput('Limite de imagens');
      return;
    }

    const filesArray: File[] = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 5242880) {
        target.value = '';
        setErrorMessageOnImageInput('Limite de tamanho');
        return;
      }
      filesArray.push(files[i]);
    }
    setSelectedFiles(selectedFiles.concat(filesArray));
    setErrorMessageOnImageInput(null);
  };

  const handleRemoveImage = (fileName: string) => {
    setSelectedFiles(selectedFiles.filter((file) => file.name !== fileName));
    setErrorMessageOnImageInput(null);
  };

  const handleRenderImages = (selectedFiles: File[]) => {
    const imageFilesPreviewArray = selectedFiles.map((file: File) => ({
      imageUrl: URL.createObjectURL(file),
      fileName: file.name,
    }));

    return imageFilesPreviewArray.map((imageFile) => (
      <div key={imageFile.imageUrl} className="relative h-32 w-36 rounded-pill border-2 border-neutral-100">
        <Image
          src={imageFile.imageUrl}
          alt="petImage"
          layout="fill"
          objectFit="cover"
          className="h-32 w-36  rounded-pill border border-red-100"
          data-testid="fileImage"
        />
        <button
          type="button"
          onClick={() => handleRemoveImage(imageFile.fileName)}
          className="absolute -top-4 -right-1 flex h-7 w-7 items-center justify-center rounded-base bg-primary-dark focus:border-2 focus:border-secondary-medium focus:outline-none"
        >
          <X size={20} color="#ffffff" />
        </button>
      </div>
    ));
  };

  const handleClickOnButtonThatTriggerHiddenInput = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  switch (variant) {
    case 'image':
      return (
        <div>
          <div className="mb-4 flex flex-col gap-1">
            <Label htmlFor="file" className="text-base font-bold">
              {label}
              {required && label && <span> *</span>}
            </Label>
            {description && <span className="text-sm">{description}</span>}
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            {handleRenderImages(selectedFiles)}
            <div>
              <button
                onClick={handleClickOnButtonThatTriggerHiddenInput}
                disabled={disabled || imageInputIsDisabled}
                className="flex h-32 w-36 cursor-pointer flex-col items-center justify-center rounded-pill border-2 border-dashed border-secondary-medium focus:bg-secondary-medium focus:bg-opacity-10 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Camera size={32} color="#6e3ed8" className="" />
                <span className="text-base font-bold text-secondary-medium">Adicionar fotos</span>
                <span className="mt-2 text-sm text-secondary-medium">PNG, JPG até 5MB</span>
              </button>
              {errorMessageOnImageInput && (
                <div className="mt-2 flex items-center">
                  <XCircle size={24} color="#e66860" />
                  <span className="ml-1 text-sm text-tertiary-medium">{errorMessageOnImageInput}</span>
                </div>
              )}
            </div>
            <input
              name="file"
              type="file"
              id="file"
              multiple
              required={required}
              accept=".png, .jpg, .jpeg"
              disabled={imageInputIsDisabled}
              onChange={imageHandleChange}
              className="hidden"
              ref={inputRef}
              {...rest}
            />
          </div>
        </div>
      );
    default:
      return <input type="file" {...rest} />;
  }
};

export default FileInput;
