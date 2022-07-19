import { Shield, User } from 'phosphor-react';
import { FC } from 'react';

export type PageType = 'my-cadastre' | 'security-and-login';

interface Props {
  selectedPage: PageType;
  setSelectedPage(page: PageType): void;
}

const NavBar: FC<Props> = (props) => {
  const { selectedPage, setSelectedPage } = props;

  const navBarOptions = [
    {
      icon: <User size={24} />,
      label: 'Meu cadastro',
      isSelected: selectedPage === 'my-cadastre',
      onClick: () => setSelectedPage('my-cadastre'),
    },
    {
      icon: <Shield size={24} />,
      label: 'Login e segurança',
      isSelected: selectedPage === 'security-and-login',
      onClick: () => setSelectedPage('security-and-login'),
    },
  ];

  const optionColors = (isSelected: boolean) => {
    return isSelected ? 'bg-secondary-medium/[0.15] text-secondary-medium' : 'text-neutral-500';
  };

  return (
    <nav className="mt-4 hidden lg:flex">
      <ul className="flex flex-col gap-4">
        {navBarOptions.map((option) => (
          <li key={option.label}>
            <button
              type="button"
              onClick={option.onClick}
              className={`flex w-full gap-4 rounded-full ${optionColors(option.isSelected)} cursor-pointer py-2 px-4`}
            >
              {option.icon}
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
