import { useShallow } from "zustand/react/shallow";

import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useOffsetConveyorStore } from "../../store/use-offset-conveyor-store";
import { useOffsetInputStore } from "../../store/use-offset-input-store";
import { useOffsetCloseConfirmModalStore } from "../../store/use-offset-modal-store";

export default function OffsetCloseConfirmModal() {
  const open = useOffsetCloseConfirmModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const offsetConveyor = useOffsetConveyorStore(useShallow((state) => state.offsetConveyor));
  const initData = useOffsetInputStore(useShallow((state) => state.initData));
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(`${RouteNames.OFFSET_ROOT}/${offsetConveyor?.name}`);
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
