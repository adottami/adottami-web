import { FC, useState } from 'react';

interface Props {
  title: string;
  options: string[];
}

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  target: {
    value: string;
    checked: boolean;
  };
}

const Checkbox: FC<Props> = ({ title, options }) => {
  const [categories, setCategories] = useState<string[]>([]);

  function handleCategories({ target }: CheckboxProps) {
    const category = target.value;
    if (target.checked) {
      setCategories([...categories, category]);
    } else {
      setCategories(categories.filter((category) => category !== target.value));
    }
  }

  return (
    <div className="row col-5">
      <form className="flex flex-col gap-y-4" action="">
        <p className="text-md font-bold">{title}</p>
        {options.map((category, index) => {
          return (
            <div key={category} className="flex gap-y-4">
              <input
                className="font-regular h-6 w-6 text-md accent-secondary-medium focus:ring-red-200"
                type="checkbox"
                value={category}
                id={'flexCheckDefault' + index}
                checked={categories.includes(category)}
                onChange={handleCategories}
              />
              <label className="ml-2" htmlFor={'flexCheckDefault' + index}>
                {category}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Checkbox;
