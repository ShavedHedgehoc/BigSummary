import { useShallow } from "zustand/react/shallow";
import { useUserUpdateModalStore } from "../store/use-update-user-modal-store";
import { Box, FormControl, FormLabel, IconButton } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import EditOffOutlinedIcon from "@mui/icons-material/EditOffOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import UserUpdateModalNameInput from "./update-user-modal-name-input";
import UserUpdateModalEmailInput from "./update-user-modal-email-input";
import UpdateUserModalPlantSelector from "./update-user-modal-plant-selector";

export default function UpdateUserModalForm() {
  const user = useUserUpdateModalStore(useShallow((state) => state.user));
  const name = useUserUpdateModalStore(useShallow((state) => state.name));
  const editName = useUserUpdateModalStore(useShallow((state) => state.editName));
  const resetName = useUserUpdateModalStore(useShallow((state) => state.resetName));
  const setEditName = useUserUpdateModalStore(useShallow((state) => state.setEditName));
  const email = useUserUpdateModalStore(useShallow((state) => state.email));
  const editEmail = useUserUpdateModalStore(useShallow((state) => state.editEmail));
  const setEditEmail = useUserUpdateModalStore(useShallow((state) => state.setEditEmail));
  const resetEmail = useUserUpdateModalStore(useShallow((state) => state.resetEmail));
  return (
    <form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl required={true}>
          <FormLabel>ФИО</FormLabel>
          <Box sx={{ display: "flex", width: "100%" }}>
            <UserUpdateModalNameInput />
            <IconButton size="sm" onClick={() => setEditName(!editName)}>
              {editName ? <EditOffOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
            <IconButton size="sm" disabled={name === user?.name} onClick={() => resetName()}>
              <CachedOutlinedIcon />
            </IconButton>
          </Box>
        </FormControl>
        <FormControl required={true}>
          <FormLabel>Email</FormLabel>
          <Box sx={{ display: "flex" }}>
            <UserUpdateModalEmailInput />
            <IconButton size="sm" onClick={() => setEditEmail(!editEmail)}>
              {editEmail ? <EditOffOutlinedIcon /> : <EditOutlinedIcon />}
            </IconButton>
            <IconButton size="sm" disabled={email === user?.email} onClick={() => resetEmail()}>
              <CachedOutlinedIcon />
            </IconButton>
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel>Площадка по умолчанию</FormLabel>
          <UpdateUserModalPlantSelector />
        </FormControl>
      </Box>
    </form>
  );
}
