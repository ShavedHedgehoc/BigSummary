import { useShallow } from "zustand/react/shallow";
import type { ScanModalProps } from "@/shared/components/modals/scan-modal";
import ScanModal from "@/shared/components/modals/scan-modal";
import { enqueueSnackbar } from "notistack";
import { useSealantBoxConfirmModalStore } from "../../store/use-sealant-modal-store";
import { AppMessages } from "@/shared/resources/app-messages";
import { parseBoxBarcode } from "@/shared/helpers/parsers";
import { useCreateProductionBox } from "../../use-create-production-box";
import type { CreateProductionBoxDto } from "@/shared/api/services/production-box-service";

export default function SealantBoxConfirmModal() {
  const open = useSealantBoxConfirmModalStore(useShallow((state) => state.open));
  const setOpen = useSealantBoxConfirmModalStore(useShallow((state) => state.setOpen));
  const { createProductionBox } = useCreateProductionBox();

  const processBarcode = (val: string) => {
    setOpen(false);

    const { uuid, box_number, batch_id, summary_id, employee_id, quantity, createdAt } = parseBoxBarcode(val);
    if (uuid && summary_id && employee_id && quantity && createdAt) {
      const dto: CreateProductionBoxDto = {
        uuid: uuid,
        box_number: box_number,
        batch_id: batch_id,
        summary_id: summary_id,
        employee_id: employee_id,
        quantity: quantity,
        createdAt: createdAt,
      };
      createProductionBox(dto);
    } else {
      enqueueSnackbar(AppMessages.MATERIAL_SCAN_ERROR, {
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return;
    }
  };

  const modalProps: ScanModalProps = {
    title: "Отсканируйте штрихкод короба",
    open: open,
    setOpen: (val) => setOpen(val),
    processInput: (val) => processBarcode(val),
  };

  return <ScanModal {...modalProps} />;
}
