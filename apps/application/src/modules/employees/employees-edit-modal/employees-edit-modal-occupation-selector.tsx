import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesEditModalStore } from "../store/use-employees-edit-modal-store";

export default function EmployeesEditModalOccupationSelector() {
  const occupationsOptions = useEmployeesEditModalStore(useShallow((state) => state.occupationsOptions));
  const occupation = useEmployeesEditModalStore(useShallow((state) => state.occupation));
  const setOccupation = useEmployeesEditModalStore(useShallow((state) => state.setOccupation));
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
