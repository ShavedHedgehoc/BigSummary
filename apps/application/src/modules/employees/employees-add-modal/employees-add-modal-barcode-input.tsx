import { useShallow } from "zustand/react/shallow";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";
import { Input } from "@mui/joy";

export default function BarcodeInput() {
  const barcode = useEmployeeAddModalStore(useShallow((state) => state.barcode));
  const setBarcode = useEmployeeAddModalStore(useShallow((state) => state.setBarcode));
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
