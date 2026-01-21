import { Typography } from "@mui/joy";
import { TubeRecordDetailDataOffsetParam } from "../../../shared/api/services/tube-records-service";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";
import { TableIconButton } from "../../../shared/ui/table-icon-button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useTubeRecordMaterialModalStore } from "../store/use-tube-record-detail-material-modal-store";
import { useShallow } from "zustand/react/shallow";

export default function TubeRecordsDetailOffsetParamsRow({
  row,
  index,
}: {
  row: TubeRecordDetailDataOffsetParam;
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
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.createdAt)}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatTimeToString(row.createdAt)}</Typography>
      </td>
      <td style={{ width: 100, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.employee}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.counter_value}</Typography>
      </td>

      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.printing_machine_speed}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.total_air_pressure}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.padding_furnace_temp}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.offset_furnace_temp}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.printer_motor}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.base_covers_holders_motor}</Typography>
      </td>

      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_1 ? row.imprint_quantity_printed_box_1 : "-"}
        </Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_2 ? row.imprint_quantity_printed_box_2 : "-"}
        </Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_3 ? row.imprint_quantity_printed_box_3 : "-"}
        </Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_4 ? row.imprint_quantity_printed_box_4 : "-"}
        </Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_5 ? row.imprint_quantity_printed_box_5 : "-"}
        </Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">
          {row.imprint_quantity_printed_box_6 ? row.imprint_quantity_printed_box_6 : "-"}
        </Typography>
      </td>

      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.base_covers_station_motor}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.ink_supply_time}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.design_match === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.tube_apperarance === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.tube_edge_deformation_lack === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.aluminium_clearance_lack === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{row.drips_lack === true ? "Ok" : "nOk"}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <TableIconButton color="success" onClick={handleInfoClick}>
          <InfoOutlinedIcon />
        </TableIconButton>
      </td>
    </tr>
  );
}
