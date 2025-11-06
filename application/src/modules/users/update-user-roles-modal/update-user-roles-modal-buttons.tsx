import { useChangeUserRolesModalStore } from "../store/use-change-user-roles-modal-store";
import { useShallow } from "zustand/react/shallow";
import { useRolesListStore } from "../store/use-roles-list-store";
import { useUpdateUserRoles } from "../use-update-user-roles";
import ModalButton, { ModalButtonProps } from "../../../shared/ui/modal-button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box } from "@mui/joy";

export default function UpdateUserRolesModalButtons() {
  const id = useChangeUserRolesModalStore(useShallow((state) => state.id));
  const setOpen = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));
  const rolesList = useRolesListStore(useShallow((state) => state.rolesList));

  const { updateRoles } = useUpdateUserRoles();
  const handleSave = () => {
    if (id) {
      updateRoles({ id: id, roles: [...rolesList] });
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeButtonProps: ModalButtonProps = {
    label: "Закрыть",
    startDecorator: <CloseOutlinedIcon />,
    onClick: () => handleClose(),
  };

  const saveButtonProps: ModalButtonProps = {
    label: "Сохранить",
    startDecorator: <SaveOutlinedIcon />,
    onClick: () => handleSave(),
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexDirection: "row",
        gap: 2,
        justifyContent: "flex-end",
      }}
    >
      <ModalButton {...saveButtonProps} />
      <ModalButton {...closeButtonProps} />
    </Box>
  );
}
