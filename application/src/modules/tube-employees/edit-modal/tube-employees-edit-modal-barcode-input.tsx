import Input from "@mui/joy/Input";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesEditModalStore } from "../store/use-tube-employees-edit-modal-store";

export default function TubeEmployeesEditModalBarcodeInput() {
  const barcode = useTubeEmployeesEditModalStore(useShallow((state) => state.barcode));
  const setBarcode = useTubeEmployeesEditModalStore(useShallow((state) => state.setBarcode));
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
