import { useShallow } from "zustand/react/shallow";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { parseMaterial } from "@/shared/helpers/parsers";
import { enqueueSnackbar } from "notistack";
import { ClientMessages } from "@/shared/resources/client-messages";
import { useExtrusionMaterialScanModalStore } from "../../store/use-extrusion-material-scan-modal-store";
import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
import { useCreateMaterialRecord } from "../../use-create-material-record";

export default function ExtrusionMaterialScanModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useExtrusionMaterialScanModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionMaterialScanModalStore(useShallow((state) => state.setOpen));
  const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  const { createMaterialRecord } = useCreateMaterialRecord();

  const processBarcode = (val: string) => {
    setOpen(false);
    const [code, lot] = parseMaterial(val);
    if (code && lot && employee && summary_id) {
      createMaterialRecord({ summary_id: summary_id, employee_id: employee.id, code: code, lot: lot, post_id: 1 });
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
