import { useShallow } from "zustand/react/shallow";
import Menu from "../common/menu";
import { useOffsetEmployeeStore } from "./store/use-offset-employee-store";
import type { MenuButtonProps } from "../common/menu-button";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import MenuButton from "../common/menu-button";
import { useOffsetAuthModalStore } from "./store/use-offset-auth-modal-store";

export default function OffsetMenu() {
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const logout = useOffsetEmployeeStore(useShallow((state) => state.clearOffsetEmployee));
  const setOpenAuth = useOffsetAuthModalStore(useShallow((state) => state.setOpen));

  const loginButtonProps: MenuButtonProps = {
    title: employee ? "Выйти" : "Авторизоваться",
    icon: employee ? <TbLogout2 /> : <TbLogin2 />,
    disabled: false,
    action: employee ? () => logout() : () => setOpenAuth(true),
  };

  return (
    <Menu>
      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
