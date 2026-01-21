import ModalLayout from "../../../shared/layouts/modal-layout";
import TableLayout from "../../../shared/layouts/table-layout";
import { useShallow } from "zustand/react/shallow";
import TableLoaderComponent from "../../../shared/components/table-loader";
import { useDashSelectSummaryModalStore } from "../store/use-dash-select-summary-modal-store";
import { useTubeConveyorAvailableSummaries } from "../../../shared/api/use-tube-conveyor-available-summaries";
import TableNotFoundComponent from "../../../shared/components/table-not-found";
import DashTubesConveyorSummariesRow from "./dash-tubes-conveyor-summaries-row";

export default function DashTubesConveyorSummariesModal() {
  const open = useDashSelectSummaryModalStore(useShallow((state) => state.open));
  const conveyor_id = useDashSelectSummaryModalStore(useShallow((state) => state.conveyor_id));
  const title = useDashSelectSummaryModalStore(useShallow((state) => state.title));
  const setOpen = useDashSelectSummaryModalStore(useShallow((state) => state.setOpen));
  const { isPending, data, isSuccess } = useTubeConveyorAvailableSummaries(conveyor_id);

  const tube_summaries_table_thead: TheadProperties[] = [
    { width: 50, padding: "18px 6px", value: "Дата" },
    { width: 50, padding: "18px 6px", value: "Партия" },
    { width: 80, padding: "18px 6px", value: "Артикул" },
    { width: 150, padding: "18px 6px", value: "Наименование" },
    { width: 50, padding: "18px 6px", value: "План" },
    { width: 80, padding: "18px 6px", value: "Действия" },
  ];

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: title,
    height: 600,
    minHeight: 600,
    width: 1200,
    onlyCloseButton: true,
  };

  const HistoryTable = () => {
    if (isPending) {
      return <TableLoaderComponent />;
    }
    if (isSuccess && data.summaries.length < 1) {
      return <TableNotFoundComponent />;
    }

    return (
      <TableLayout thead={tube_summaries_table_thead}>
        {isSuccess && data.summaries.map((row) => <DashTubesConveyorSummariesRow row={row} key={row.id} />)}
      </TableLayout>
    );
  };

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <HistoryTable />
    </ModalLayout>
  );
}
