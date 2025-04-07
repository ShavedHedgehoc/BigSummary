import { useShallow } from "zustand/shallow";
import { useCansHistoryModalStore } from "../store/use-cans-history-modal-store";
import { useCanRecords } from "../use-cans-records";
import TableLoaderComponent from "../../../shared/components/table-loader";
import TableLayout from "../../../shared/layouts/table-layout";
import ModalLayout from "../../../shared/layouts/modal-layout";
import { ITraceCanRecord } from "../../../shared/api/services/trace-cans-service";
import { Typography } from "@mui/joy";
import { formatDateToString, formatTimeToString } from "../../../shared/helpers/date-time-formatters";

export default function CansHistoryModal() {
  const open = useCansHistoryModalStore(useShallow((state) => state.open));
  const can_id = useCansHistoryModalStore(useShallow((state) => state.can_id));
  const title = useCansHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useCansHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useCanRecords(can_id);

  const history_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Время" },
    { width: 100, padding: "18px 6px", value: "Статус записи", align: "left" },
    { width: 50, padding: "18px 6px", value: "Партия", align: "left" },
    { width: 80, padding: "18px 6px", value: "Автор записи", align: "left" },
  ];

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 600,
    width: 800,
    onlyCloseButton: true,
  };

  const CansHistoryTableRow = ({ row }: { row: ITraceCanRecord }) => {
    return (
      <tr>
        <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
          <Typography level="body-xs">{formatDateToString(row.CreateDate)}</Typography>
        </td>
        <td style={{ width: 50, textAlign: "center", padding: "18px 6px" }}>
          <Typography level="body-xs">{formatTimeToString(row.CreateDate)}</Typography>
        </td>
        <td style={{ width: 100, textAlign: "left", padding: "18px 6px" }}>
          <Typography level="body-xs">{row.stateDescription}</Typography>
        </td>
        <td style={{ width: 50, textAlign: "left", padding: "18px 6px" }}>
          <Typography level="body-xs">{row.baseContain ? row.baseContain : "-"}</Typography>
        </td>
        <td style={{ width: 80, textAlign: "left", padding: "18px 6px" }}>
          <Typography level="body-xs">{row.authorName}</Typography>
        </td>
      </tr>
    );
  };

  const HistoryTable = () => {
    if (isPending) {
      return <TableLoaderComponent />;
    }
    return (
      <TableLayout thead={history_table_thead}>
        {isSuccess && data.map((row) => <CansHistoryTableRow row={row} key={row.CanRecordPK} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <HistoryTable />
    </ModalLayout>
  );
}
