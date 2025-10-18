import { useShallow } from "zustand/shallow";
import { useTraceBatchWghtReportDetailDeleteModalStore } from "./store/use-trace-batch-wght-report-detail-delete-modal-store";
import ModalLayout from "../../shared/layouts/modal-layout";
import { Box, Typography } from "@mui/joy";
import TableButton, { TableButtonProps } from "../../shared/ui/table-button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { formatDateToString, formatTimeToString } from "../../shared/helpers/date-time-formatters";
import { useDeleteWeightingsByContainerId } from "./use-delete-weightings-by-conteiner-id";
function ButtonsComponent() {
  const row = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.row));
  const setOpen = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.setOpen));

  const { deleteWeightings } = useDeleteWeightingsByContainerId();
  const handleDeleteClick = () => {
    setOpen(false);
    if (row && row.container_pk) {
      deleteWeightings(row.container_pk);
    }
  };

  const deleteButtonProps: TableButtonProps = {
    variant: "danger",
    label: "Удалить",
    onClick: () => handleDeleteClick(),
    startDecorator: <DeleteOutlinedIcon />,
  };

  const closeButtonProps: TableButtonProps = {
    variant: "success",
    label: "Закрыть",
    onClick: () => setOpen(false),
    startDecorator: <CloseOutlinedIcon />,
  };
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", gap: 1 }}>
      <TableButton {...deleteButtonProps} />
      <TableButton {...closeButtonProps} />
    </Box>
  );
}

function TextComponent() {
  const row = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.row));
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
      <Typography level="h2">Внимание!</Typography>
      <Typography>Вы действительно хотите удалить запись о взвешивании?</Typography>
      <Typography level="body-xs">
        {row?.product_id} {row?.product_name} {row?.quantity} кг
      </Typography>
      <Typography level="body-xs">
        Взвесил: {row?.author}, {row?.w_date ? formatTimeToString(row?.w_date) : "-"}{" "}
        {row?.w_date ? formatDateToString(row?.w_date) : "-"}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
        <Typography level="body-xs">Количество видов сырья в емкости</Typography>
        <Typography level="body-xs" color={row ? (row?.records > 1 ? "danger" : "success") : "success"}>
          {row?.records}
        </Typography>
      </Box>
    </Box>
  );
}

export default function TraceBatchWghtReportDetailDeleteModal() {
  const open = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.open));
  const title = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.title));
  const setOpen = useTraceBatchWghtReportDetailDeleteModalStore(useShallow((state) => state.setOpen));

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 250,
    width: 600,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          gap: 1,
        }}
      >
        <TextComponent />
        <ButtonsComponent />
      </Box>
    </ModalLayout>
  );
}
