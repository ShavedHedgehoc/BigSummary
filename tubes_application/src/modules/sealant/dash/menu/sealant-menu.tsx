import Menu from "../../../../shared/components/menu/menu";
import type { MenuButtonProps } from "../../../../shared/components/menu/menu-button";
import { TbAdjustments, TbAutomation, TbBarcode, TbLibraryPhoto, TbLogin2, TbLogout2, TbPrinter } from "react-icons/tb";
import MenuButton from "../../../../shared/components/menu/menu-button";
import { TbStopwatch } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import useSealantMenu from "./use-sealant-menu";
import { useActiveSummary } from "@/shared/api/use-active-summary";
import type { PrintReceiptDto } from "@/shared/api/services/zpl-service";
import { usePrintZpl } from "../../use-print-zpl";
import { makeBoxReceipt } from "@/shared/helpers/make-zpl-receipt";

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
    endButtonDisabledCondition,
  } = useSealantMenu();
  const { data: summaryData } = useActiveSummary(sealantConveyor?.id ?? null);

  const { printZPL } = usePrintZpl();

  const handlePrintClick = () => {
    const zplData: {
      name: string;
      code: string;
      batch: string;
      boxNumber: number;
      quantity: number;
      employee: string;
    } = {
      name: summaryData?.data.product_name ?? "",
      code: summaryData?.data.product_code ?? "",
      batch: summaryData?.data.batch_name ?? "",
      boxNumber: 1,
      quantity: 300,
      employee: employee?.name ?? "",
    };
    const zpl = makeBoxReceipt(zplData);
    const dto: PrintReceiptDto = {
      ip: "192.168.250.95",
      port: 9100,
      zpl: zpl,
    };
    printZPL(dto);
  };

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
    disabled: false,
    action: () => handlePrintClick(),
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
      <MenuButton {...picturesButtonProps} />
      <MenuButton {...endButtonProps} />
      <MenuButton {...printButtonProps} />

      <MenuButton {...loginButtonProps} />
    </Menu>
  );
}
