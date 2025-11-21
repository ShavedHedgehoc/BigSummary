import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbX, TbDeviceFloppy } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import type { ISummary } from "@/shared/api/services/summary-service";
import useExtrusionAddEntryMenu from "./use-extrusion-add-entry-menu";

export default function ExtrusionAddEntryMenu({ summaryData }: { summaryData: ISummary | null }) {
  const { saveButtonDisabledCondition, handleSaveClick, handleExitClick } = useExtrusionAddEntryMenu(summaryData);
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
