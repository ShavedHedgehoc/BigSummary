import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import { useShallow } from "zustand/react/shallow";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDeleteEmployee } from "./use-delete-employee";
import { useEmployeesEditModalStore } from "./store/use-employees-edit-modal-store";

export default function EmployeesRow({ row }: { row: IEmployee }) {
  const { deleteEmployee } = useDeleteEmployee();
  const openEditModal = useEmployeesEditModalStore(useShallow((state) => state.setOpen));
  const setId = useEmployeesEditModalStore(useShallow((state) => state.setId));
  const setName = useEmployeesEditModalStore(useShallow((state) => state.setName));
  const setBarcode = useEmployeesEditModalStore(useShallow((state) => state.setBarcode));
  const setOccupation = useEmployeesEditModalStore(useShallow((state) => state.setOccupation));

  const handleEdit = () => {
    setId(row.id);
    setName(row.name);
    setBarcode(row.barcode);
    setOccupation(row.occupation.id);
    openEditModal(true);
  };

  const handleDelete = () => {
    deleteEmployee(row.id);
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
        <Typography level="body-xs">{row.occupation.description}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
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
