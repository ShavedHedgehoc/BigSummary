import ModalLayout from "../../shared/layouts/modal-layout";
import TableLayout from "../../shared/layouts/table-layout";
import { useRecordHistories } from "../../shared/api/use-record-histories";
import { useShallow } from "zustand/react/shallow";
import TableLoaderComponent from "../../shared/components/table-loader";
import { useDashHistoryModalStore } from "./store/use-dash-history-modal-store";
import DashHistoryModalRow from "./dash-history-modal-row";

export default function DashHistoryModal() {
  const open = useDashHistoryModalStore(useShallow((state) => state.open));
  const record_id = useDashHistoryModalStore(useShallow((state) => state.record_id));
  const title = useDashHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useDashHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useRecordHistories(record_id);

  const history_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Время" },
    { width: 100, padding: "18px 6px", value: "Статус записи" },
    { width: 80, padding: "18px 6px", value: "Автор записи" },
    { width: 50, padding: "18px 6px", value: "Комментарий" },
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
        {isSuccess && data.histories.map((row) => <DashHistoryModalRow row={row} key={row.id} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <HistoryTable />
    </ModalLayout>
  );
}
