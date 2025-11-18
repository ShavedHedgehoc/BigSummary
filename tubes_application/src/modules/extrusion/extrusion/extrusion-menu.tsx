import { useShallow } from "zustand/react/shallow";
import Menu from "../../common/menu";
import { useExtrusionEmployeeStore } from "../store/use-extrusion-employee-store";
import type { MenuButtonProps } from "../../common/menu-button";
import { TbAdjustments, TbBarcode, TbLogin2, TbLogout2 } from "react-icons/tb";
import MenuButton from "../../common/menu-button";
import { useExtrusionAuthModalStore, useExtrusionLogoutModalStore } from "../store/use-extrusion-auth-modal-store";
import { useExtrusionMaterialScanModalStore } from "../store/use-extrusion-material-scan-modal-store";

import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useExtrusionConveyorStore } from "../store/use-extrusion-conveyor-store";

export default function ExtrusionMenu() {
  const navigate = useNavigate();
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const setOpenAuth = useExtrusionAuthModalStore(useShallow((state) => state.setOpen));
  const setOpenMaterialScan = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const setOpenLogout = useExtrusionLogoutModalStore(useShallow((state) => state.setOpen));

  const loginButtonProps: MenuButtonProps = {
    title: employee ? "Выйти" : "Авторизоваться",
    icon: employee ? <TbLogout2 /> : <TbLogin2 />,
    disabled: false,
    action: employee ? () => setOpenLogout(true) : () => setOpenAuth(true),
  };

  const scanMaterilButtonProps: MenuButtonProps = {
    title: "Комплектующие",
    icon: <TbBarcode />,
    disabled: employee ? false : true,
    action: () => setOpenMaterialScan(true),
  };

  const inputParametersButtonProps: MenuButtonProps = {
    title: "Параметры",
    icon: <TbAdjustments />,
    disabled: employee ? false : true,
    action: () => navigate(`${RouteNames.EXTRUSION_ADD_ENTRY_ROOT}/${extrusionConveyor?.name}`),
  };

  return (
    <Menu>
      <MenuButton {...inputParametersButtonProps} />
      <MenuButton {...scanMaterilButtonProps} />
      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
