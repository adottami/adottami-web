import { FCC } from '@/types/react';

interface Props {
  title?: string;
}

const AccountSettingsSection: FCC<Props> = (props) => {
  const { children, title } = props;

  return (
    <div className="rounded-pill bg-white p-6 drop-shadow">
      {title && <h3 className="mb-4 text-lg font-bold text-neutral-800">{title}</h3>}
      {children}
    </div>
  );
};

export default AccountSettingsSection;
