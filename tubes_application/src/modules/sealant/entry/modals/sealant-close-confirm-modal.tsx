import { useShallow } from "zustand/react/shallow";
import type { AlertModalProps } from "@/shared/components/modals/alert-modal";
import AlertModal from "@/shared/components/modals/alert-modal";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "@/shared/router/route-names";
import { useSealantConveyorStore } from "../../store/use-sealant-conveyor-store";
import { useSealantCloseConfirmModalStore } from "../../store/use-sealant-modal-store";
import { useSealantInputStore } from "../../store/use-sealant-input-store";

export default function SealantCloseConfirmModal() {
  const open = useSealantCloseConfirmModalStore(useShallow((state) => state.open));
  const setOpen = useSealantCloseConfirmModalStore(useShallow((state) => state.setOpen));
  const sealantConveyor = useSealantConveyorStore(useShallow((state) => state.sealantConveyor));
  const initData = useSealantInputStore(useShallow((state) => state.initData));
  const navigate = useNavigate();

  const redirectBack = () => {
    navigate(`${RouteNames.SEALANT_ROOT}/${sealantConveyor?.name}`);
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
