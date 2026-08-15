import { useShallow } from "zustand/react/shallow";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";
import { Option, Select } from "@mui/joy";

export default function EmployeesAddModalOccupationSelector() {
  const occupationsOptions = useEmployeeAddModalStore(useShallow((state) => state.occupationsOptions));
  const occupation = useEmployeeAddModalStore(useShallow((state) => state.occupation));
  const setOccupation = useEmployeeAddModalStore(useShallow((state) => state.setOccupation));

  const options = occupationsOptions.map((occupation) => (
    <Option value={occupation.id} key={occupation.id}>
      {occupation.description}
    </Option>
  ));

  return (
    <Select
      placeholder="Выберите роль"
      size="sm"
      value={occupation}
      slotProps={{
        button: { sx: { whiteSpace: "nowrap" } },
        listbox: { sx: { zIndex: 999999 } },
      }}
      sx={{
        minWidth: "220px",
        maxWidth: "220px",
        display: "flex",
        flexShrink: 1,
      }}
      onChange={(event: React.SyntheticEvent | null, newValue: number | null) => {
        event && newValue && setOccupation(newValue);
      }}
    >
      {options}
    </Select>
  );
}
