import React, { useImperativeHandle, useRef } from 'react';

import { PublicationFields } from '@/models/publication/types';

interface Props {
  header: string;
  onSubmit(values: PublicationFields): void;
}

export interface PublicationFormRef {
  submit: (() => void) | undefined;
}

const PublicationForm = React.forwardRef<PublicationFormRef, Props>((props, ref) => {
  const { onSubmit } = props;

  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      submit: formRef.current?.submit,
    }),
    [],
  );

  return <form ref={formRef} onSubmit={() => onSubmit({} as PublicationFields)} />;
});

export default PublicationForm;
