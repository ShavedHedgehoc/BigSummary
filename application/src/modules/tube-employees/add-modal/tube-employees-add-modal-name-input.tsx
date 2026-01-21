import Input from "@mui/joy/Input";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";

export default function TubeEmployeesAddModalNameInput() {
  const name = useTubeEmployeesAddModalStore(useShallow((state) => state.name));
  const setName = useTubeEmployeesAddModalStore(useShallow((state) => state.setName));
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
