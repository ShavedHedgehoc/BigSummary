import { useShallow } from "zustand/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../../shared/helpers/date-time-formatters";
import { useInventoriesFilterStore } from "../store/use-inventories-filter-store";

export default function InventoriesFilterClearButton() {
  const clearFilter = useInventoriesFilterStore(useShallow((state) => state.clearFilter));
  const filter = useInventoriesFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.startDate === getFirstDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.endDate === getLastDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
