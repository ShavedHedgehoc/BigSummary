import Input from "@mui/joy/Input";
import { useShallow } from "zustand/react/shallow";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";

export default function EmployeesAddModalNameInput() {
  const name = useEmployeeAddModalStore(useShallow((state) => state.name));
  const setName = useEmployeeAddModalStore(useShallow((state) => state.setName));
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
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Введите ФИО"
    />
  );
}
