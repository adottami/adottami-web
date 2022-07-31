import { FC } from 'react';

interface Props {
  label: string;
}

const Tag: FC<Props> = ({ label }) => (
  <div className="flex max-h-8 rounded-pill bg-secondary-light bg-opacity-30 py-1 px-2">
    <span className="text-secondary-medium">{label}</span>
  </div>
);

export default Tag;
