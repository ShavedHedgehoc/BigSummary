import Input from "@mui/joy/Input";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesEditModalStore } from "../store/use-employees-edit-modal-store";

export default function EmployeesEditModalBarcodeInput() {
  const barcode = useEmployeesEditModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEmployeesEditModalStore(useShallow((state) => state.setBarcode));
  return (
    <Input
      sx={{
        "&:focus-within": {
          "--Input-focusedHighlight": "var(--joy-palette-neutral-400)",
        },
        minWidth: "200px",
        display: "flex",
        flexShrink: 1,
      }}
      value={barcode}
      onChange={(e) => setBarcode(e.target.value)}
      placeholder="Введите штрихкод"
    />
  );
}
