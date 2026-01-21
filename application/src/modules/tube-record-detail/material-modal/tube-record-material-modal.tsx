import { useShallow } from "zustand/react/shallow";
import ModalLayout from "../../../shared/layouts/modal-layout";
import { useTubeRecordMaterialModalStore } from "../store/use-tube-record-detail-material-modal-store";
import TubeRecordMaterialModalTable from "./tube-record-material-modal-table";

export default function TubeRecordMaterialModal() {
  const open = useTubeRecordMaterialModalStore(useShallow((state) => state.open));
  const setOpen = useTubeRecordMaterialModalStore(useShallow((state) => state.setOpen));
  const title = useTubeRecordMaterialModalStore(useShallow((state) => state.title));
  const clearData = useTubeRecordMaterialModalStore(useShallow((state) => state.clearData));

  const handleClose = () => {
    setOpen(false);
    clearData();
  };

  const modalProps = {
    open: open,
    onClose: () => handleClose(),
    title: title,
    height: 600,
    minHeight: 300,
    width: 800,
    onlyCloseButton: true,
  };
  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      <TubeRecordMaterialModalTable />
    </ModalLayout>
  );
}
