import { useShallow } from "zustand/react/shallow";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";
import ModalInputWithClear, { ModalInputWithClearProps } from "../../../shared/ui/modal-input-with-clear";

export default function UpdateUserModalEmailInput() {
  const email = useUserUpdateModalStore(useShallow((state) => state.email));
  const editEmail = useUserUpdateModalStore(useShallow((state) => state.editEmail));
  const setEmail = useUserUpdateModalStore(useShallow((state) => state.setEmail));
  const inputProps: ModalInputWithClearProps = {
    value: email,
    disabled: !editEmail,
    onChange: (e) => setEmail(e),
    onClear: () => setEmail(""),
  };
  return <ModalInputWithClear {...inputProps} />;
}
