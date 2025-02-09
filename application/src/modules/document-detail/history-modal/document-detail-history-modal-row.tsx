import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/joy/Typography";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { rowScope } from "../../../shared/helpers/status-conditions";
import { StyledTypography } from "../../../shared/ui/styled-typography";
import { useShallow } from "zustand/shallow";
import { useNoteModalStore } from "../../../shared/components/note-modal/use-note-modal-store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteHistory } from "../../../shared/api/use-delete-history";

export default function DocumentDetailHistoryModalRow({ row, godmode }: { row: IHistory; godmode: boolean }) {
  const setNoteModalOpen = useNoteModalStore(useShallow((state) => state.setOpen));
  const setNoteId = useNoteModalStore(useShallow((state) => state.setNoteId));

  const handleNoteModalButtonClick = (note_id: number) => {
    setNoteId(note_id);
    setNoteModalOpen(true);
  };
  const scope = rowScope(row.historyType.value);

  const { deleteHistory, deletePending } = useDeleteHistory();

  return (
    <tr key={row.id}>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
      </td>
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
      </td>
      <td scope={scope} style={{ width: 100, textAlign: "center", padding: "18px 6px" }}>
        <StyledTypography text={row.historyType.description} state={row.historyType.value} />
      </td>
      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.user ? row.user.name : row.employee ? row.employee.name : "-"}</Typography>
      </td>
      <td scope={scope} style={{ width: 80, textAlign: "center", padding: "6px 6px" }}>
        {row.note_id && (
          <IconButton
            disabled={deletePending}
            variant="plain"
            size="sm"
            onClick={() => handleNoteModalButtonClick(row.note_id)}
          >
            <InfoOutlinedIcon />
          </IconButton>
        )}
      </td>
      {godmode && (
        <td scope={scope} style={{ width: 50, textAlign: "center", padding: "6px 6px" }}>
          <IconButton
            disabled={deletePending}
            variant="plain"
            size="sm"
            color="danger"
            onClick={() => deleteHistory(row.id)}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </td>
      )}
    </tr>
  );
}
