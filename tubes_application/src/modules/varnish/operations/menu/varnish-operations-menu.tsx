import MenuButton, { type MenuButtonProps } from "@/shared/components/menu/menu-button";
import { TbSettingsAutomation, TbSettingsCancel, TbX } from "react-icons/tb";
import Menu from "@/shared/components/menu/menu";
import type { ISummary } from "@/shared/api/services/summary-service";
import useVarnishOperationsMenu from "./use-varnish-operations-menu";

export default function VarnishOperationsMenu({ summaryData }: { summaryData: ISummary | null }) {
  const {
    handleSetClick,
    handleExitClick,
    handleWorkingClick,
    setIdleButtonVisibleCondition,
    setWorkingButtonVisibleCondition,
    setIdleButtonDisableCondition,
    setWorkingButtonDisableCondition,
  } = useVarnishOperationsMenu(summaryData);
  const backButtonProps: MenuButtonProps = {
    title: "Закрыть",
    icon: <TbX />,
    disabled: false,
    action: () => handleExitClick(),
  };

  const setIdleButtonProps: MenuButtonProps = {
    title: "Начать",
    icon: <TbSettingsAutomation />,
    disabled: setIdleButtonDisableCondition,
    action: () => handleSetClick(),
  };

  const setWorkingButtonProps: MenuButtonProps = {
    title: "Закончить",
    icon: <TbSettingsCancel />,
    disabled: setWorkingButtonDisableCondition,
    action: () => handleWorkingClick(),
  };

  return (
    <Menu>
      {setIdleButtonVisibleCondition && <MenuButton {...setIdleButtonProps} />}
      {setWorkingButtonVisibleCondition && <MenuButton {...setWorkingButtonProps} />}
      <MenuButton {...backButtonProps} />
    </Menu>
  );
}
