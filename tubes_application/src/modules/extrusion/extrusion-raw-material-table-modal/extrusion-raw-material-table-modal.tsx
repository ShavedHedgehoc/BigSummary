import { useExtrusionRawMaterialTableModalStore } from "../store/use-extrusion-raw-material-table-modal-store";
import { useShallow } from "zustand/react/shallow";
import type { TableModalProps } from "@/shared/components/table-modal";
import TableModal from "@/shared/components/table-modal";
import ExtrusionRawMaterialTable from "./extrusion-raw-material-table";

export default function ExtrusionRawMaterialTableModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useExtrusionRawMaterialTableModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionRawMaterialTableModalStore(useShallow((state) => state.setOpen));

  const modalProps: TableModalProps = {
    title: "Комплектующие",
    open: open,
    setOpen: (val) => setOpen(val),
  };

  return (
    <TableModal props={modalProps}>
      <ExtrusionRawMaterialTable summary_id={summary_id} />
    </TableModal>
  );
}
