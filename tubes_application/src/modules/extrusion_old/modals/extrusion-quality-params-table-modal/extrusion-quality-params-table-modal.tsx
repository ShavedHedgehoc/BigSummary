import { useExtrusionQualityParamsTableModalStore } from "../../store/use-extrusion-quality-params-table-modal-store";
import { useShallow } from "zustand/react/shallow";
import type { TableModalProps } from "@/shared/components/modals/table-modal";
import TableModal from "@/shared/components/modals/table-modal";
import ExtrusionQualityParamsTable from "./extrusion-quality-params-table";

export default function ExtrusionQualityParamsTableModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useExtrusionQualityParamsTableModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionQualityParamsTableModalStore(useShallow((state) => state.setOpen));

  const modalProps: TableModalProps = {
    title: "Параметры",
    open: open,
    setOpen: (val) => setOpen(val),
  };

  return (
    <TableModal props={modalProps}>
      <ExtrusionQualityParamsTable summary_id={summary_id} />
    </TableModal>
  );
}
