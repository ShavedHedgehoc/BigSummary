import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbX, TbPrinter, TbBarcode } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import type { ISummary } from "@/shared/api/services/summary-service";
import useSealantPrintMenu from "./use-sealant-print-menu";

export default function SealantPrintMenu({ summaryData }: { summaryData: ISummary | null }) {
  const {
    handlePrintClick,
    handleExitClick,
    handleConfirmClick,
    printButtonDisabledCondition,
    confirmButtonDisabledCondition,
  } = useSealantPrintMenu({
    summaryData: summaryData,
  });

  const printButtonProps: MenuButtonProps = {
    title: "Напечатать",
    icon: <TbPrinter />,
    disabled: printButtonDisabledCondition,
    action: () => handlePrintClick(),
  };

  const confirmButtonProps: MenuButtonProps = {
    title: "Подтвердить",
    icon: <TbBarcode />,
    disabled: confirmButtonDisabledCondition,
    action: () => handleConfirmClick(),
  };

  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => handleExitClick(),
  };

  return (
    <Menu>
      <MenuButton {...printButtonProps} />
      <MenuButton {...confirmButtonProps} />
      <MenuButton {...backButtonProps} />
    </Menu>
  );
}
