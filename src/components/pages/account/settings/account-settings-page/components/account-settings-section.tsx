import { FCC } from '@/types/react';

interface Props {
  title?: string;
  description?: string | (JSX.Element | string)[];
}

const AccountSettingsSection: FCC<Props> = (props) => {
  const { children, title, description } = props;

  return (
    <div className="rounded-pill bg-white p-6 drop-shadow">
      {title && <h3 className="mb-4 text-lg font-bold text-neutral-800">{title}</h3>}
      {description && <div className="mt-[-8px] mb-8 text-sm text-neutral-500">{description}</div>}
      {children}
    </div>
  );
};

export default AccountSettingsSection;
