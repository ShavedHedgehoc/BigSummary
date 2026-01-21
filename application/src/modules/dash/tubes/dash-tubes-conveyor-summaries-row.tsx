import Typography from "@mui/joy/Typography";
import { formatDateToString } from "../../../shared/helpers/date-time-formatters";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";

import { IAvailableSummary } from "../../../shared/api/services/tube-records-service";
import TableButton, { TableButtonProps } from "../../../shared/ui/table-button";
import { useDashStartModalStore } from "../store/use-dash-start-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function DashTubesConveyorSummariesRow({ row }: { row: IAvailableSummary }) {
  const setBoilValue = useDashStartModalStore(useShallow((state) => state.setBoilValue));
  const setSummaryId = useDashStartModalStore(useShallow((state) => state.setSummaryId));
  const setTitleStart = useDashStartModalStore(useShallow((state) => state.setTitle));
  const setOpenStart = useDashStartModalStore(useShallow((state) => state.setOpen));

  const handleNoteModalButtonClick = () => {
    setTitleStart("Начать партию");
    setBoilValue(row.batch.name);
    setSummaryId(row.id);
    setOpenStart(true);
  };

  const buttonProps: TableButtonProps = {
    label: "Начать",
    variant: "success",
    startDecorator: <PlayCircleFilledWhiteOutlinedIcon />,
    onClick: () => handleNoteModalButtonClick(),
  };

  return (
    <tr key={row.id}>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.batch.name}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product.marking}</Typography>
      </td>
      <td style={{ width: 150, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.product.name}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td style={{ width: 80, textAlign: "center", padding: "18px 6px" }}>
        <TableButton {...buttonProps} />
      </td>
    </tr>
  );
}
