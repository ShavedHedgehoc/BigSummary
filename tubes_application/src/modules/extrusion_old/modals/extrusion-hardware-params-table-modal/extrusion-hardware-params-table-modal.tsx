import { useExtrusionHardwareParamsTableModalStore } from "../../store/use-extrusion-hardware-params-table-modal-store";
import { useShallow } from "zustand/react/shallow";
import type { TableModalProps } from "@/shared/components/modals/table-modal";
import TableModal from "@/shared/components/modals/table-modal";
import ExtrusionHardwareParamsTable from "./extrusion-hardware-params-table";
import { useEffect } from "react";

export default function ExtrusionHardwareParamsTableModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useExtrusionHardwareParamsTableModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionHardwareParamsTableModalStore(useShallow((state) => state.setOpen));

  const modalProps: TableModalProps = {
    title: "Параметры",
    open: open,
    setOpen: (val) => setOpen(val),
  };

  useEffect(() => {
    console.log("render table modal");
  }, []);

  return (
    <TableModal props={modalProps}>
      <ExtrusionHardwareParamsTable summary_id={summary_id} />
    </TableModal>
  );
}
