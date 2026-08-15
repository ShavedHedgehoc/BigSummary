import { useShallow } from "zustand/react/shallow";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";
import { Box } from "@mui/joy";
import { IUpdateUserDto } from "../../../shared/api/services/user-service";
import ModalButton, { ModalButtonProps } from "../../../shared/ui/modal-button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { useUpdateUser } from "../use-update-user";

export default function UpdateUserModalButtons() {
  const setOpen = useUserUpdateModalStore(useShallow((state) => state.setOpen));
  const id = useUserUpdateModalStore(useShallow((state) => state.id));
  const name = useUserUpdateModalStore(useShallow((state) => state.name));
  const email = useUserUpdateModalStore(useShallow((state) => state.email));
  const setEditName = useUserUpdateModalStore(useShallow((state) => state.setEditName));
  const setEditEmail = useUserUpdateModalStore(useShallow((state) => state.setEditEmail));
  const plants = useUserUpdateModalStore(useShallow((state) => state.plants));

  const { updateUser } = useUpdateUser();

  const handleSave = () => {
    if (id) {
      const userForUpload: IUpdateUserDto = {
        user_id: id,
        name: name,
        email: email,
        user_settings: plants.length ? { plant_id: plants[0] } : null,
      };
      updateUser(userForUpload);
    }
    setEditName(false);
    setEditEmail(false);
    setOpen(false);
  };

  const handleClose = () => {
    setEditName(false);
    setEditEmail(false);
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
