import { useShallow } from "zustand/react/shallow";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeRecordsListFilterStore } from "../store/use-tube-records-list-filter-store";
import { getFirstDayOfCurrentMonth, getLastDayOfCurrentMonth } from "../../../shared/helpers/date-time-formatters";

export default function TubeRecordsListFilterClearButton() {
  const clearFilter = useTubeRecordsListFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTubeRecordsListFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.start_date === getFirstDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.end_date === getLastDayOfCurrentMonth().toJSON().slice(0, 10) &&
    filter.states.length === 0 &&
    filter.conveyors.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
