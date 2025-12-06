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
} from "react-icons/tb";
import MenuButton from "../../../../shared/components/menu/menu-button";
import { TbStopwatch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import useOffsetMenu from "./use-offset-menu";
import { useActiveSummary } from "@/shared/api/use-active-summary";

export default function OffsetMenu() {
  const navigate = useNavigate();
  const {
    employee,
    offsetConveyor,
    setOpenAuth,
    setOpenLogout,
    setOpenMaterialScan,
    setOpenCloseSummary,
    inputParametersButtonDisabledCondition,
    scanMaterialsButtonDisabledCondition,
    operationButtonDisabledCondition,
    pictureButtonDisabledCondition,
    endButtonDisabledCondition,
  } = useOffsetMenu();
  const { data: summaryData } = useActiveSummary(offsetConveyor?.id ?? null);

  const inputParametersButtonProps: MenuButtonProps = {
    title: "Параметры",
    icon: <TbAdjustments />,
    disabled: inputParametersButtonDisabledCondition,
    action: () => navigate(`${RouteNames.OFFSET_ADD_ENTRY_ROOT}/${offsetConveyor?.name}`),
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
    action: () => navigate(`${RouteNames.OFFSET_OPERATIONS_ROOT}/${offsetConveyor?.name}`),
  };

  const sopButtonProps: MenuButtonProps = {
    title: "Инфо",
    icon: <TbInfoTriangle />,
    disabled: false,
    action: () =>
      summaryData?.offsetStatus.operation_id
        ? navigate(`${RouteNames.OFFSET_SOP_ROOT}/${summaryData.extrusionStatus.operation_id}`)
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
      {summaryData && summaryData.offsetStatus.state === "idle" && <MenuButton {...sopButtonProps} />}
      <MenuButton {...picturesButtonProps} />
      <MenuButton {...endButtonProps} />
      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
