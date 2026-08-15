import ModalLayout from "../../../shared/layouts/modal-layout";
import TableLayout from "../../../shared/layouts/table-layout";
import { useRecordHistories } from "../../../shared/api/use-record-histories";
import { useShallow } from "zustand/react/shallow";
import TableLoaderComponent from "../../../shared/components/table-loader";
import { useTimeReportHistoryModalStore } from "../store/use-time-report-history-modal-store";
import TimeReportHistoryModalRow from "./time-report-history-modal-row";

export default function TimeReportHistoryModal() {
  const open = useTimeReportHistoryModalStore(useShallow((state) => state.open));
  const record_id = useTimeReportHistoryModalStore(useShallow((state) => state.record_id));
  const title = useTimeReportHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useTimeReportHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useRecordHistories(record_id);

  const history_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Время" },
    { width: 100, padding: "18px 6px", value: "Статус записи" },
    { width: 80, padding: "18px 6px", value: "Автор записи" },
    { width: 80, padding: "18px 6px", value: "Комментарий" },
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

  const HistoryTable = () => {
    if (isPending) {
      return <TableLoaderComponent />;
    }
    return (
      <TableLayout thead={history_table_thead}>
        {isSuccess && data.histories.map((row) => <TimeReportHistoryModalRow row={row} key={row.id} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <HistoryTable />
    </ModalLayout>
  );
}
