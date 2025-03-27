import { Typography, useColorScheme } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useShallow } from "zustand/shallow";
import { TableState } from "../../../shared/ui/table-state";
import { useBoilsReportHistoryModalStore } from "../store/use-boils-report-history-modal-store";
import { formatTwoDatesDiffTimeToString } from "../../../shared/helpers/date-time-formatters";

const useHistoryModalOpen = ({ row }: { row: IBoilReportRow }) => {
  const setOpen = useBoilsReportHistoryModalStore(useShallow((state) => state.setOpen));
  const setRecordId = useBoilsReportHistoryModalStore(useShallow((state) => state.setRecordId));
  const setTitle = useBoilsReportHistoryModalStore(useShallow((state) => state.setTitle));

  const handleOpenHistoryModalButtonClick = () => {
    setRecordId(row.id);
    setTitle(`Историй статусов по основе ${row.base_marking}, партия - ${row.value}`);
    setOpen(true);
  };
  return handleOpenHistoryModalButtonClick;
};

const HistoryModalOpenButton = ({ row }: { row: IBoilReportRow }) => {
  const handleOpenHistoryModalButtonClick = useHistoryModalOpen({ row });
  return (
    <IconButton variant="plain" size="sm" onClick={() => handleOpenHistoryModalButtonClick()}>
      <InfoOutlinedIcon />
    </IconButton>
  );
};

export default function BoilsReportRow({ row }: { row: IBoilReportRow }) {
  const { mode } = useColorScheme();

  return (
    <tr key={row.id}>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.value}</Typography>
      </td>
      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_marking ? row.base_marking : "-"}</Typography>
      </td>

      <td style={{ width: 64, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.base_code ? row.base_code : "-"}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plant ? row.plant : "-"}</Typography>
      </td>

      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.recordsCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.recordsCount}
        </Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography
          level="body-xs"
          sx={{ color: mode === "dark" ? (row.historiesCount !== 0 ? "success.plainColor" : "neutral") : "neutral" }}
        >
          {row.historiesCount}
        </Typography>
      </td>
      <td style={{ width: 96, textAlign: "center", padding: "18px 6px" }}>
        <TableState text={row.state} state={row.stateValue} />
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.lastBaseCheckTime && row.lastPlugPassTime && row.stateValue === "plug_pass"
            ? formatTwoDatesDiffTimeToString(row.lastBaseCheckTime, row.lastPlugPassTime)
            : "-"}
        </Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">
          {row.firstBaseCheckTime && row.lastPlugPassTime && row.stateValue === "plug_pass"
            ? formatTwoDatesDiffTimeToString(row.firstBaseCheckTime, row.lastPlugPassTime)
            : "-"}
        </Typography>
      </td>
      <td style={{ width: 30, textAlign: "center", padding: "6px 6px" }}>
        {row.historiesCount !== 0 && <HistoryModalOpenButton row={row} />}
      </td>
    </tr>
  );
}
