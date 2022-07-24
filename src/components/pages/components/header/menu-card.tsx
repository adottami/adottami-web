import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon: JSX.Element;
  href: string;
  text: string;
  actionFunction?: () => void;
}

const MenuCard: FC<Props> = ({ icon, href, text, actionFunction }) => {
  const router = useRouter();

  return (
    <div
      className={`flex items-center ${
        router.pathname === href ? 'text-secondary-medium' : 'text-neutral-800'
      } hover:text-secondary-medium`}
      onClick={actionFunction}
      onKeyUp={actionFunction}
      role="button"
      tabIndex={0}
    >
      {icon}
      <Link href={href} passHref>
        <a
          className={`ml-2.5 text-lg font-medium hover:text-secondary-medium ${
            router.pathname === href ? 'text-secondary-medium' : 'text-neutral-800'
          } `}
        >
          {text}
        </a>
      </Link>
    </div>
  );
};

export default MenuCard;
