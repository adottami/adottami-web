import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  icon: JSX.Element;
  href: string;
  text: string;
}

const MenuCard: FC<Props> = ({ icon, href, text }) => {
  const router = useRouter();

  return (
    <li
      className={`flex items-center ${
        router.pathname === href ? 'text-secondary-medium' : 'text-neutral-800'
      } hover:text-secondary-medium`}
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
    </li>
  );
};

export default MenuCard;
