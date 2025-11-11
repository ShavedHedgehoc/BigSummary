import { useShallow } from "zustand/react/shallow";
import { useExtrusionMaterialScanModalStore } from "./store/use-extrusion-material-scan-modal-store";
import type { ScanModalProps } from "@/shared/components/scan-modal";
import ScanModal from "@/shared/components/scan-modal";
import { parseMaterial } from "@/shared/helpers/parsers";
import { useExtrusionEmployeeStore } from "./store/use-extrusion-employee-store";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useCreateRawMaterialCurrent } from "./use-create-raw-material-current";

export default function ExtrusionMaterialScanModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useExtrusionMaterialScanModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { createRawMaterialCurrent } = useCreateRawMaterialCurrent();

  const processBarcode = (val: string) => {
    setOpen(false);
    const [code, lot] = parseMaterial(val);
    if (code && lot && employee && summary_id) {
      createRawMaterialCurrent({ summary_id: summary_id, employee_id: employee.id, code: code, lot: lot });
      return;
    }
    enqueueSnackbar(ClientMessages.MATERIAL_SCAN_ERROR, {
      variant: "error",
      anchorOrigin: { vertical: "top", horizontal: "right" },
    });
  };

  const modalProps: ScanModalProps = {
    title: "Отсканируйте штрихкод комплектующих",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => processBarcode(val),
  };

  return <ScanModal {...modalProps} />;
}
