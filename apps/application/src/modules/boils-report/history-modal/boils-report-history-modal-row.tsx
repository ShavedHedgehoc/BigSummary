import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Typography from "@mui/joy/Typography";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { rowScope } from "../../../shared/helpers/status-conditions";
import { StyledTypography } from "../../../shared/ui/styled-typography";
import { useShallow } from "zustand/react/shallow";
import { useNoteModalStore } from "../../../shared/components/note-modal/use-note-modal-store";

export default function BoilsReportHistoryModalRow({ row }: { row: IHistory }) {
  const setNoteModalOpen = useNoteModalStore(useShallow((state) => state.setOpen));
  const setNoteId = useNoteModalStore(useShallow((state) => state.setNoteId));

  const handleNoteModalButtonClick = (note_id: number) => {
    setNoteId(note_id);
    setNoteModalOpen(true);
  };
  const scope = rowScope(row.historyType.value);
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
      <td scope={scope} style={{ width: 50, textAlign: "center", padding: "6px 6px" }}>
        {row.note_id && (
          <IconButton variant="plain" size="sm" onClick={() => handleNoteModalButtonClick(row.note_id)}>
            <InfoOutlinedIcon />
          </IconButton>
        )}
      </td>
    </tr>
  );
}
