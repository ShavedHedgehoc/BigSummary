import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeTresholdsFilterStore } from "../store/use-tube-tresholds-filter-store";

export default function TubeTresholdsFilterClearButton() {
  const clearFilter = useTubeTresholdsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTubeTresholdsFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.code === "" && filter.marking === "" && filter.conveyors.length === 0 && filter.empty.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
