import { FCC } from '@/types/react';

interface Props {
  title: string;
  description: string;
}

const DefaultSection: FCC<Props> = (props) => {
  const { title, description, children } = props;

  return (
    <div className="flex-1">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
        <p className="text-md text-neutral-500">{description}</p>
      </div>

      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
};

export default DefaultSection;
