import { useShallow } from "zustand/react/shallow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTimeReportFilterStore } from "../store/use-time-report-filter-store";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";

export default function TimeReportFilterClearButton() {
  const clearFilter = useTimeReportFilterStore(useShallow((state) => state.clearFilter));
  const filter = useTimeReportFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.boil === "" &&
    filter.marking === "" &&
    filter.conveyor === "" &&
    filter.productCode === "" &&
    filter.date === getCurrentDay().toJSON().slice(0, 10);

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
