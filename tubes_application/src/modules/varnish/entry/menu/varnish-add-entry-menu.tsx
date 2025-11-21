import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbX, TbDeviceFloppy } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import type { ISummary } from "@/shared/api/services/summary-service";
import useVarnishAddEntryMenu from "./use-varnish-add-entry-menu";

export default function VarnishAddEntryMenu({ summaryData }: { summaryData: ISummary | null }) {
  const { saveButtonDisabledCondition, handleSaveClick, handleExitClick } = useVarnishAddEntryMenu(summaryData);
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
