import { useShallow } from "zustand/react/shallow";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";
import ModalLayout, { ModalLayoutProps } from "../../../shared/layouts/modal-layout";
import UpdateUserModalButtons from "./update-user-modal-buttons";
import UpdateUserModalForm from "./update-user-modal-form";

export default function UserUpdateModal() {
  const open = useUserUpdateModalStore(useShallow((state) => state.open));
  const setOpen = useUserUpdateModalStore(useShallow((state) => state.setOpen));

  const modalProps: ModalLayoutProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Редактирование пользователя",
    height: 300,
    minHeight: 200,
    width: 400,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<UpdateUserModalButtons />}>
      <UpdateUserModalForm />
    </ModalLayout>
  );
}
