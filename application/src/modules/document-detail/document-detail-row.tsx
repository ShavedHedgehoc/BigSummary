import Typography from "@mui/joy/Typography";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { TableState } from "../../shared/ui/table-state";
import { TableIconButton } from "../../shared/ui/table-icon-button";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/joy";
import { useDocumentDetailDeleteRecordlModalStore } from "./store/use-document-detail-delete-record-modal-store";
import { useShallow } from "zustand/shallow";
import { useDocumentDetailEditRecordlModalStore } from "./store/use-document-detail-edit-record-modal-store";

export default function DocumentDetailRow({ row }: { row: IDocRow }) {
  const navigate = useNavigate();
  const setOpenDeleteModal = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setOpen));
  const setDeleteId = useDocumentDetailDeleteRecordlModalStore(useShallow((state) => state.setId));

  const setOpenEditModal = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setOpen));
  const setEditRow = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setRow));
  const setEditApparatus = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setApparatus));
  const setCan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setCan));
  const setConveyor = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setConveyor));
  const setPlan = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setPlan));
  const setNote = useDocumentDetailEditRecordlModalStore(useShallow((state) => state.setNote));

  const handleDeleteButtonClick = () => {
    setDeleteId(row.id);
    setOpenDeleteModal(true);
  };

  const handleEditButtonClick = () => {
    setEditRow(row);
    setEditApparatus(row.apparatus);
    setCan(row.can);
    setConveyor(row.conveyor);
    setPlan(row.plan.toString());
    setNote(row.note);
    setOpenEditModal(true);
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.productId}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.boil}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.apparatus}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.can}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.conveyor}</Typography>
      </td>
      <td style={{ width: 200, textAlign: "justify", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.note}</Typography>
      </td>
      <td style={{ width: 110, textAlign: "center", padding: "18px 6px" }}>
        <TableState text={row.state} state={row.stateValue} />
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "12px 6px" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <TableIconButton color="primary" onClick={() => handleEditButtonClick()}>
            <EditOutlinedIcon />
          </TableIconButton>
          <TableIconButton color="success" onClick={() => navigate(`/record/` + `${row.id}`)}>
            <InfoOutlinedIcon />
          </TableIconButton>
          <TableIconButton
            color="danger"
            disabled={
              row.stateValue === "product_check" ||
              row.stateValue === "product_fail" ||
              row.stateValue === "product_pass" ||
              row.stateValue === "product_in_progress" ||
              row.stateValue === "product_finished" ||
              row.stateValue === "product_correct"
            }
            onClick={() => handleDeleteButtonClick()}
          >
            <DeleteOutlinedIcon />
          </TableIconButton>
        </Box>
      </td>
    </tr>
  );
}
