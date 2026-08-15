import Input from "@mui/joy/Input";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesEditModalStore } from "../store/use-employees-edit-modal-store";

export default function EmployeesEditModalNameInput() {
  const name = useEmployeesEditModalStore(useShallow((state) => state.name));
  const setName = useEmployeesEditModalStore(useShallow((state) => state.setName));
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
