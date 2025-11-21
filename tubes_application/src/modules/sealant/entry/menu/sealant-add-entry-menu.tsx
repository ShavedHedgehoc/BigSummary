import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbX, TbDeviceFloppy } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import type { ISummary } from "@/shared/api/services/summary-service";
import useSealantAddEntryMenu from "./use-sealant-add-entry-menu";

export default function SealantAddEntryMenu({ summaryData }: { summaryData: ISummary | null }) {
  const { saveButtonDisabledCondition, handleSaveClick, handleExitClick } = useSealantAddEntryMenu(summaryData);
  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => handleExitClick(),
  };

  const saveButtonProps: MenuButtonProps = {
    title: "Сохранить",
    icon: <TbDeviceFloppy />,
    disabled: saveButtonDisabledCondition,
    action: () => handleSaveClick(),
  };

  return (
    <Menu>
      <MenuButton {...backButtonProps} />
      <MenuButton {...saveButtonProps} />
    </Menu>
  );
}
