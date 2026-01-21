import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";
import { Option, Select } from "@mui/joy";

export default function TubeEmployeesAddModalRankSelector() {
  const rankOptions = useTubeEmployeesAddModalStore(useShallow((state) => state.rankOptions));
  const rank = useTubeEmployeesAddModalStore(useShallow((state) => state.rank));
  const setRank = useTubeEmployeesAddModalStore(useShallow((state) => state.setRank));

  const options = rankOptions.map((rank) => (
    <Option value={rank.id} key={rank.id}>
      {rank.description}
    </Option>
  ));

  return (
    <Select
      placeholder="Выберите разряд"
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
