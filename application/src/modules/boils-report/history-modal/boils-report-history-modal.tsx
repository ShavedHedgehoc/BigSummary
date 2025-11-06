import ModalLayout from "../../../shared/layouts/modal-layout";
import TableLayout from "../../../shared/layouts/table-layout";

import { useShallow } from "zustand/react/shallow";
import TableLoaderComponent from "../../../shared/components/table-loader";
import { useBoilsReportHistoryModalStore } from "../store/use-boils-report-history-modal-store";
import BoilsReportHistoryModalRow from "./boils-report-history-modal-row";
import { useBoilsHistories } from "../../../shared/api/use-boils-histories";

export default function BoilsReportHistoryModal() {
  const open = useBoilsReportHistoryModalStore(useShallow((state) => state.open));
  const record_id = useBoilsReportHistoryModalStore(useShallow((state) => state.record_id));
  const title = useBoilsReportHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useBoilsReportHistoryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useBoilsHistories(record_id);

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
        {isSuccess && data.map((row) => <BoilsReportHistoryModalRow row={row} key={row.id} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <HistoryTable />
    </ModalLayout>
  );
}
