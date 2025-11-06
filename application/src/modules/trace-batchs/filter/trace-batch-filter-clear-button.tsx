import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchsFilterStore } from "../store/use-trace-batchs-filter-store";

export default function TraceBatchsFilterClearButton() {
  const clearFilter = useTraceBatchsFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterClearButton =
    filter.startDate === getFirstDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.endDate === getLastDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.batch === "" &&
    filter.marking === "" &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableDocumentFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
