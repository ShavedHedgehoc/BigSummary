import Menu from "../../../../shared/components/menu/menu";
import type { MenuButtonProps } from "../../../../shared/components/menu/menu-button";
import { TbAdjustments, TbBarcode, TbLibraryPhoto, TbLogin2, TbLogout2 } from "react-icons/tb";
import MenuButton from "../../../../shared/components/menu/menu-button";

import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import useVarnishMenu from "./use-varnish-menu";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function VarnishMenu() {
  const navigate = useNavigate();
  const { employee, varnishConveyor, setOpenAuth, setOpenLogout, setOpenMaterialScan } = useVarnishMenu();
  const { data: summaryData } = useActiveSummary(varnishConveyor?.id ?? null);

  const inputParametersButtonProps: MenuButtonProps = {
    title: "Параметры",
    icon: <TbAdjustments />,
    disabled: employee ? false : true,
    action: () => navigate(`${RouteNames.VARNISH_ADD_ENTRY_ROOT}/${varnishConveyor?.name}`),
  };

  const scanMaterilButtonProps: MenuButtonProps = {
    title: "Комплектующие",
    icon: <TbBarcode />,
    disabled: employee ? false : true,
    action: () => setOpenMaterialScan(true),
  };

  const picturesButtonProps: MenuButtonProps = {
    title: "Изображения",
    icon: <TbLibraryPhoto />,
    disabled: summaryData === null,
    action: () =>
      summaryData?.data.product_id ? navigate(`${RouteNames.PICTURES_ROOT}/${summaryData.data.product_id}`) : undefined,
  };

  const loginButtonProps: MenuButtonProps = {
    title: employee ? "Выйти" : "Авторизоваться",
    icon: employee ? <TbLogout2 /> : <TbLogin2 />,
    disabled: false,
    action: employee ? () => setOpenLogout(true) : () => setOpenAuth(true),
  };

  return (
    <Menu>
      <MenuButton {...inputParametersButtonProps} />
      <MenuButton {...scanMaterilButtonProps} />
      <MenuButton {...picturesButtonProps} />
      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
