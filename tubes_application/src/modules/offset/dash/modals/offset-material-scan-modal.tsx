import { useShallow } from "zustand/react/shallow";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { parseMaterial } from "@/shared/helpers/parsers";
import { enqueueSnackbar } from "notistack";
import { useCreateConsumedMaterial } from "@/shared/api/use-create-consumed-material";
import { useOffsetEmployeeStore } from "../../store/use-offset-employee-store";
import { useOffsetMaterialScanModalStore } from "../../store/use-offset-modal-store";
import { AppMessages } from "@/shared/resources/app-messages";

export default function OffsetMaterialScanModal({ summary_id }: { summary_id: number | undefined }) {
  const open = useOffsetMaterialScanModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetMaterialScanModalStore(useShallow((state) => state.setOpen));
  const employee = useOffsetEmployeeStore(useShallow((state) => state.offsetEmployee));
  const { createConsumedMaterial } = useCreateConsumedMaterial();

  const processBarcode = (val: string) => {
    setOpen(false);
    const [code, lot] = parseMaterial(val);
    if (code && lot && employee && summary_id) {
      createConsumedMaterial({ summary_id: summary_id, employee_id: employee.id, code: code, lot: lot, post_id: 3 });
      return;
    }
    enqueueSnackbar(AppMessages.MATERIAL_SCAN_ERROR, {
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
