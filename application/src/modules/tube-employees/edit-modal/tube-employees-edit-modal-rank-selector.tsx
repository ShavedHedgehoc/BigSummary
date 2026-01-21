import React from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesEditModalStore } from "../store/use-tube-employees-edit-modal-store";

export default function TubeTubeEmployeesEditModalRankSelector() {
  const ranksOptions = useTubeEmployeesEditModalStore(useShallow((state) => state.ranksOptions));
  const rank = useTubeEmployeesEditModalStore(useShallow((state) => state.rank));
  const setRank = useTubeEmployeesEditModalStore(useShallow((state) => state.setRank));
  const options = ranksOptions.map((rank) => (
    <Option value={rank.id} key={rank.id}>
      {rank.description}
    </Option>
  ));
  return (
    <Select
      placeholder="Выберите роль"
      size="sm"
      value={rank}
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
        event && newValue && setRank(newValue);
      }}
    >
      {options}
    </Select>
  );
}
