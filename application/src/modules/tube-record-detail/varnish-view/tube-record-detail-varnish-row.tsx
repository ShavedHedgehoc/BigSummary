import { Typography } from "@mui/joy";
import { TubeRecordDetailDataVarnishParam } from "../../../shared/api/services/tube-records-service";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TableIconButton } from "../../../shared/ui/table-icon-button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useShallow } from "zustand/react/shallow";
import { useTubeRecordMaterialModalStore } from "../store/use-tube-record-detail-material-modal-store";

export default function TubeRecordsDetailVarnishParamsRow({
  row,
  index,
}: {
  row: TubeRecordDetailDataVarnishParam;
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
        <Typography level="body-xs">{row.varnish_machine_speed}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.total_air_pressure}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.feed_can_air_pressure}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.nozzle_regulator_air_pressure}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.cells_speed}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.injection_a_start_position}/{row.injection_b_start_position}
        </Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.injection_c_start_position}/{row.injection_d_start_position}
        </Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.injection_a_end_position}/{row.injection_b_end_position}
        </Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.injection_c_end_position}/{row.injection_d_end_position}
        </Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.tube_molding_start_position}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.tube_molding_end_position}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.polimerization_furnace_temp}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.internal_varnish_porosity}</Typography>
      </td>

      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.internal_sectional_view === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.aluminium_clearance_lack === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.unpainting_lack === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 120, textAlign: "center", padding: "12px 24px" }}>
        <TableIconButton color="success" onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>
    </tr>
  );
}
