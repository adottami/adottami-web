import MenuContext from '@/contexts/account-menu-context/account-menu-context';

function useAccountMenu() {
  return MenuContext.useContext();
}

export default useAccountMenu;
