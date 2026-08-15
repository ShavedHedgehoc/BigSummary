import { Box, IconButton, Typography } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

import { useShallow } from "zustand/react/shallow";

import { IUserRow } from "../../shared/api/services/user-service";
import { useChangeUserRolesModalStore } from "./store/use-change-user-roles-modal-store";
import { useRolesListStore } from "./store/use-roles-list-store";
import { TableState } from "../../shared/ui/table-state";
import { useChangeUserStatus } from "./use-change-user-banned-status";
import { useUserUpdateModalStore } from "./store/use-update-user-modal-store";

export default function UsersRow({ row }: { row: IUserRow }) {
  const openChangeRolesModal = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));
  const setId = useChangeUserRolesModalStore(useShallow((state) => state.setId));
  const setRoles = useRolesListStore(useShallow((state) => state.setRoles));
  const openUpdateUserModal = useUserUpdateModalStore(useShallow((state) => state.setOpen));
  const setUserToUpdate = useUserUpdateModalStore(useShallow((state) => state.setUser));
  const setNameToUpdate = useUserUpdateModalStore(useShallow((state) => state.setName));
  const setEmailToUpdate = useUserUpdateModalStore(useShallow((state) => state.setEmail));
  const setUserToUpdateId = useUserUpdateModalStore(useShallow((state) => state.setId));
  const setSelectedplant = useUserUpdateModalStore(useShallow((state) => state.setSelectedPlant));
  const setPlants = useUserUpdateModalStore(useShallow((state) => state.setPlants));

  const handleChangeRolesButtonClick = () => {
    const roles = row.roles.map((role) => role.id);
    setId(row.id);
    setRoles(roles);
    openChangeRolesModal(true);
  };

  const { changeStatus, isPending } = useChangeUserStatus();

  const handleChangeStatus = () => {
    changeStatus(row.id);
  };

  const handleEditButtonClick = () => {
    setUserToUpdateId(row.id);
    setUserToUpdate(row);
    setNameToUpdate(row.name);
    setEmailToUpdate(row.email);
    if (row.user_settings) {
      setSelectedplant(row.user_settings.plant_id);
      setPlants({ key: "", value: "", values: [row.user_settings.plant_id] });
    } else {
      setSelectedplant(999999);
      setPlants({ key: "", value: "", values: [] });
    }
    openUpdateUserModal(true);
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 48, textAlign: "left", padding: "12px 6px 6px 40px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 48, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.email}</Typography>
      </td>
      <td style={{ width: 180, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Typography>{row.roles.length ? row.roles.map((item) => item.description).join(", ") : "-"}</Typography>
          </Box>
        </Typography>
      </td>
      <td style={{ width: 48, textAlign: "center", padding: "12px 6px" }}>
        <Typography>{row.user_settings ? row.user_settings.plant.value : "-"}</Typography>
      </td>
      <td style={{ width: 32, textAlign: "center", padding: "12px 6px" }}>
        <TableState state={row.banned ? "fail" : "success"} text={row.banned ? "Забанен" : "Активен"} />
      </td>
      <td style={{ width: 48, textAlign: "center", padding: "6px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {/* Edit user data */}
          <IconButton color="primary" size="sm" onClick={() => handleEditButtonClick()}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="primary" size="sm" onClick={() => handleChangeRolesButtonClick()}>
            <ManageAccountsOutlinedIcon />
          </IconButton>
          <IconButton color="danger" size="sm" disabled={isPending} onClick={() => handleChangeStatus()}>
            <BlockOutlinedIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
