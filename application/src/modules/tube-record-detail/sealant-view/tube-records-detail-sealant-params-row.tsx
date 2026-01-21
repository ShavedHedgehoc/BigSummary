import { Typography } from "@mui/joy";
import { TubeRecordDetailDataSealantParam } from "../../../shared/api/services/tube-records-service";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TableIconButton } from "../../../shared/ui/table-icon-button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useShallow } from "zustand/react/shallow";
import { useTubeRecordMaterialModalStore } from "../store/use-tube-record-detail-material-modal-store";

export default function TubeRecordsDetailSealantParamsRow({
  row,
  index,
}: {
  row: TubeRecordDetailDataSealantParam;
  index: number;
}) {
  const setOpen = useTubeRecordMaterialModalStore(useShallow((state) => state.setOpen));
  const setData = useTubeRecordMaterialModalStore(useShallow((state) => state.setData));
  const setTitle = useTubeRecordMaterialModalStore(useShallow((state) => state.setTitle));

  const handleInfoClick = () => {
    setTitle("Использованные материалы");
    setData(row.consumed_materials);
    setOpen(true);
  };
  return (
    <tr key={row.id}>
      <td style={{ width: 10, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{index + 1}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
      </td>
      <td style={{ width: 200, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.employee}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.counter_value}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.cap_machine_speed}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.total_air_pressure}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.holders_forward}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.holders_opening_left}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.holders_opening_right}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.holders_closing}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{`${row.injection_a_start}/${row.injection_b_start}`}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{`${row.injection_a_end}/${row.injection_b_end}`}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.injection_tube_orientation_start}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.injection_tube_orientation_end}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.is_cap_surface_smooth === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.latex_ring_padding}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.latex_ring_width}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.tube_rigidity}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.cap_unscrewing_torque}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <TableIconButton color="success" onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>
    </tr>
  );
}
