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

export default function UsersRow({ row }: { row: IUserRow }) {
  const openChangeRolesModal = useChangeUserRolesModalStore(useShallow((state) => state.setOpen));
  const setId = useChangeUserRolesModalStore(useShallow((state) => state.setId));
  const setRoles = useRolesListStore(useShallow((state) => state.setRoles));

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
      <td style={{ width: 32, textAlign: "center", padding: "12px 6px" }}>
        <TableState state={row.banned ? "fail" : "success"} text={row.banned ? "Забанен" : "Активен"} />
      </td>
      <td style={{ width: 48, textAlign: "center", padding: "6px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {/* Edit user data */}
          <IconButton
            color="primary"
            size="sm"
            // onClick={() =>
            //   handleEditButtonClick({ id: row.id, name: row.name, barcode: row.barcode, occupation: row.occupation.id })
            // }
          >
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
