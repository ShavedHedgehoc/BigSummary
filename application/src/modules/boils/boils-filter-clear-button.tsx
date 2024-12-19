import { useShallow } from "zustand/shallow";
import { useBoilsFilterStore } from "./store/use-boils-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../shared/ui/filter-button";

export default function BoilsFilterClearButton() {
  const clearFilter = useBoilsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useBoilsFilterStore(useShallow((state) => state.filter));

  const disableBoilFilterClearButton =
    filter.boil === "" &&
    filter.marking === "" &&
    filter.baseCode === "" &&
    filter.states.length === 0 &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableBoilFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
