import { useShallow } from "zustand/react/shallow";
import { useExtrusionCloseConfirmModalStore } from "../../store/use-extrusion-modal-store";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useExtrusionConveyorStore } from "../../store/use-extrusion-conveyor-store";
import { useExtrusionInputStore } from "../../store/use-extrusion-input-current-parameters-store";

export default function ExtrusionCloseConfirmModal() {
  const open = useExtrusionCloseConfirmModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const extrusionConveyor = useExtrusionConveyorStore(useShallow((state) => state.extrusionConveyor));
  const initData = useExtrusionInputStore(useShallow((state) => state.initData));
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(`${RouteNames.EXTRUSION_ROOT}/${extrusionConveyor?.name}`);
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
