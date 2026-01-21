import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ITubeEmployee } from "../../shared/api/services/tube-employees-service";
import { useDeleteTubeEmployee } from "./use-delete-tube-employee";
import { StyledTypography } from "../../shared/ui/styled-typography";
import { useChangeTubeEmployeeStatus } from "./use-change-tube-employee-status";
import { useTubeEmployeesEditModalStore } from "./store/use-tube-employees-edit-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function TubeEmployeesRow({ row }: { row: ITubeEmployee }) {
  const { changeTubeEmployeeStatus } = useChangeTubeEmployeeStatus();
  const { deleteTubeEmployee } = useDeleteTubeEmployee();
  const openEditModal = useTubeEmployeesEditModalStore(useShallow((state) => state.setOpen));
  const setId = useTubeEmployeesEditModalStore(useShallow((state) => state.setId));
  const setName = useTubeEmployeesEditModalStore(useShallow((state) => state.setName));
  const setBarcode = useTubeEmployeesEditModalStore(useShallow((state) => state.setBarcode));
  const setRank = useTubeEmployeesEditModalStore(useShallow((state) => state.setRank));

  const handleChangeStatus = () => {
    changeTubeEmployeeStatus(row.id);
  };

  const handleEdit = () => {
    setId(row.id);
    setName(row.name);
    setBarcode(row.barcode);
    setRank(row.rank.id);
    openEditModal(true);
  };

  const handleDelete = () => {
    deleteTubeEmployee(row.id);
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "left", padding: "12px 36px" }}>
        <Typography level="body-xs">{row.name}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.barcode}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.rank?.description ?? "-"}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography text={row.banned ? "Запрещен" : "Разрешен"} state={row.banned ? "fail" : "success"} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton color="danger" size="sm" onClick={() => handleChangeStatus()}>
            <BlockOutlinedIcon />
          </IconButton>
          <IconButton color="primary" size="sm" onClick={() => handleEdit()}>
            <EditOutlinedIcon />
          </IconButton>
          <IconButton color="danger" size="sm" onClick={() => handleDelete()}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
