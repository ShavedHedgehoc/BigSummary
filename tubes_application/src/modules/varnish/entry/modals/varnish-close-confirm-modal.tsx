import { useShallow } from "zustand/react/shallow";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useVarnishConveyorStore } from "../../store/use-varnish-conveyor-store";
import { useVarnishCloseConfirmModalStore } from "../../store/use-varnish-modal-store";
import { useVarnishInputStore } from "../../store/use-varnish-input-store";

export default function VarnishCloseConfirmModal() {
  const open = useVarnishCloseConfirmModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const varnishConveyor = useVarnishConveyorStore(useShallow((state) => state.varnishConveyor));
  const initData = useVarnishInputStore(useShallow((state) => state.initData));
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(`${RouteNames.VARNISH_ROOT}/${varnishConveyor?.name}`);
    initData();
  };

  const alertModalProps: AlertModalProps = {
    title: "Закрыть",
    message: "Вы действительно хотите вернуться на главную? Все введенные параметры будут очищены.",
    actionButtonValue: "Закрыть",
    cancelButtonValue: "Остаться",
    open: open,
    setOpen: (val: boolean) => setOpen(val),
    okAction: () => redirectBack(),
  };

  return <AlertModal {...alertModalProps} />;
}
