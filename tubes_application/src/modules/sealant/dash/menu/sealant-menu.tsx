import Menu from "../../../../shared/components/menu/menu";
import type { MenuButtonProps } from "../../../../shared/components/menu/menu-button";
import {
  TbAdjustments,
  TbAutomation,
  TbBarcode,
  TbInfoTriangle,
  TbLibraryPhoto,
  TbLogin2,
  TbLogout2,
  TbPrinter,
} from "react-icons/tb";
import MenuButton from "../../../../shared/components/menu/menu-button";
import { TbStopwatch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import useSealantMenu from "./use-sealant-menu";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function SealantMenu() {
  const navigate = useNavigate();
  const {
    employee,
    sealantConveyor,
    setOpenAuth,
    setOpenLogout,
    setOpenMaterialScan,
    setOpenCloseSummary,
    inputParametersButtonDisabledCondition,
    scanMaterialsButtonDisabledCondition,
    operationButtonDisabledCondition,
    pictureButtonDisabledCondition,
    printButtonDisabledCondition,
    endButtonDisabledCondition,
  } = useSealantMenu();
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);

  const inputParametersButtonProps: MenuButtonProps = {
    title: "Параметры",
    icon: <TbAdjustments />,
    disabled: inputParametersButtonDisabledCondition,
    action: () => navigate(`${RouteNames.SEALANT_ADD_ENTRY_ROOT}/${sealantConveyor?.name}`),
  };

  const scanMaterilButtonProps: MenuButtonProps = {
    title: "Комплектующие",
    icon: <TbBarcode />,
    disabled: scanMaterialsButtonDisabledCondition,
    action: () => setOpenMaterialScan(true),
  };

  const operationsButtonProps: MenuButtonProps = {
    title: "Операции",
    icon: <TbAutomation />,
    disabled: operationButtonDisabledCondition,
    action: () => navigate(`${RouteNames.SEALANT_OPERATIONS_ROOT}/${sealantConveyor?.name}`),
  };
  const sopButtonProps: MenuButtonProps = {
    title: "Инфо",
    icon: <TbInfoTriangle />,
    disabled: false,
    action: () =>
      summaryData?.sealantStatus.operation_id
        ? navigate(`${RouteNames.SEALANT_SOP_ROOT}/${summaryData.sealantStatus.operation_id}`)
        : undefined,
  };

  const picturesButtonProps: MenuButtonProps = {
    title: "Изображения",
    icon: <TbLibraryPhoto />,
    disabled: pictureButtonDisabledCondition,
    action: () =>
      summaryData?.data.product_id ? navigate(`${RouteNames.PICTURES_ROOT}/${summaryData.data.product_id}`) : undefined,
  };

  const endButtonProps: MenuButtonProps = {
    title: "Закончить",
    icon: <TbStopwatch />,
    disabled: endButtonDisabledCondition,
    action: () => setOpenCloseSummary(true),
  };
  const printButtonProps: MenuButtonProps = {
    title: "Печать",
    icon: <TbPrinter />,
    disabled: printButtonDisabledCondition,
    action: () => navigate(`${RouteNames.SEALANT_PRINT_ROOT}/${sealantConveyor?.name}`),
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
      <MenuButton {...operationsButtonProps} />
      {summaryData && summaryData.sealantStatus.state === "idle" && <MenuButton {...sopButtonProps} />}
      <MenuButton {...picturesButtonProps} />
      <MenuButton {...endButtonProps} />
      <MenuButton {...printButtonProps} />
      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
