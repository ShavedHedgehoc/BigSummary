import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbX } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import { useNavigate } from "react-router-dom";

export default function OffsetSopMenu() {
  const navigate = useNavigate();
  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => navigate(-1),
  };

  return (
    <Menu>
      <MenuButton {...backButtonProps} />
    </Menu>
  );
}
