import { useShallow } from "zustand/react/shallow";

import { Input } from "@mui/joy";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";

export default function BarcodeInput() {
  const barcode = useTubeEmployeesAddModalStore(useShallow((state) => state.barcode));
  const setBarcode = useTubeEmployeesAddModalStore(useShallow((state) => state.setBarcode));
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
