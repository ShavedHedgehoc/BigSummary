import { useShallow } from "zustand/shallow";
import { useCansFilterStore } from "./store/use-cans-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";

export default function CansFilterClearButton() {
  const clearFilter = useCansFilterStore(useShallow((state) => state.clearFilter));
  const filter = useCansFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.can === "" &&
    !filter.transit &&
    filter.states.length === 0 &&
    filter.plants.length === 0 &&
    filter.volumes.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
