import { useShallow } from "zustand/react/shallow";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";
import ModalInputWithClear, { ModalInputWithClearProps } from "../../../shared/ui/modal-input-with-clear";

export default function UpdateUserModalNameInput() {
  const name = useUserUpdateModalStore(useShallow((state) => state.name));
  const editName = useUserUpdateModalStore(useShallow((state) => state.editName));
  const setName = useUserUpdateModalStore(useShallow((state) => state.setName));
  const inputProps: ModalInputWithClearProps = {
    value: name,
    disabled: !editName,
    fullWidth: true,
    onChange: (e) => setName(e),
    onClear: () => setName(""),
  };
  return <ModalInputWithClear {...inputProps} />;
}
