import { Box, Typography } from "@mui/joy";
import IconButton from "@mui/joy/IconButton";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import { ITubeEmployee } from "../../shared/api/services/tube-employees-service";

import { StyledTypography } from "../../shared/ui/styled-typography";
// import { useChangeTubeEmployeeStatus } from "./use-change-tube-employee-status";
// import { useTubeRecordsListEditModalStore } from "./store/use-tube-employees-edit-modal-store";
// import { useShallow } from "zustand/react/shallow";
import { ITubeRecordRow } from "../../shared/api/services/tube-records-service";
import { formatDateToString } from "../../shared/helpers/date-time-formatters";
import { useDeleteTubeRecord } from "./use-delete-tube-record";
import { RouteNames } from "../../shared/router/route-names";
import { useNavigate } from "react-router-dom";
import AssessmentIcon from "@mui/icons-material/Assessment";

export default function TubeRecordsListRow({ row }: { row: ITubeRecordRow }) {
  //   const { changeTubeEmployeeStatus } = useChangeTubeEmployeeStatus();
  const { deleteTubeRecord } = useDeleteTubeRecord();
  const navigate = useNavigate();
  //   const openEditModal = useTubeRecordsListEditModalStore(useShallow((state) => state.setOpen));
  //   const setId = useTubeRecordsListEditModalStore(useShallow((state) => state.setId));
  //   const setName = useTubeRecordsListEditModalStore(useShallow((state) => state.setName));
  //   const setBarcode = useTubeRecordsListEditModalStore(useShallow((state) => state.setBarcode));
  //   const setRank = useTubeRecordsListEditModalStore(useShallow((state) => state.setRank));

  // const handleChangeStatus = () => {
  // changeTubeEmployeeStatus(row.id);
  // console.log("change");
  // };

  // const handleEdit = () => {
  // setId(row.id);
  // setName(row.name);
  // setBarcode(row.barcode);
  // setRank(row.rank.id);
  // openEditModal(true);
  //   console.log("edit");
  // };

  const handleDelete = () => {
    deleteTubeRecord(row.id);
    console.log("delete");
  };

  const recCount =
    row._count.extrusion_statuses +
    row._count.varnish_statuses +
    row._count.offset_statuses +
    row._count.sealant_statuses;

  return (
    <tr key={row.id}>
      <td style={{ width: 40, textAlign: "center", padding: "12px 24px" }}>
        <Typography level="body-xs">{formatDateToString(row.date)}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.conveyor.name}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.shift}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.batch.name}</Typography>
      </td>
      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product.code}</Typography>
      </td>

      <td style={{ width: 90, textAlign: "left", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.product.marking}</Typography>
      </td>
      <td style={{ width: 200, textAlign: "left", padding: "12px 6px", flexGrow: 1 }}>
        <Typography level="body-xs">{row.product.name}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <Typography level="body-xs">{row.plan}</Typography>
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography
          text={row.isFinished ? "Завершено" : row.isActive ? "В работе" : "-"}
          state={row.isFinished === true ? "product_pass" : row.isActive === true ? "product_check" : "neutral"}
        />
      </td>

      <td style={{ width: 40, textAlign: "center", padding: "12px 6px" }}>
        <StyledTypography state={recCount === 0 ? "error" : "success"} text={recCount} />
      </td>
      <td style={{ width: 50, textAlign: "center", padding: "12px 36px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton
            color="success"
            size="sm"
            onClick={() => navigate(`${RouteNames.TUBES_RECORDS_DETAIL_ROOT}/${row.id}`)}
          >
            <AssessmentIcon />
          </IconButton>
          <IconButton color="danger" disabled={recCount !== 0} size="sm" onClick={() => handleDelete()}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      </td>
    </tr>
  );
}
