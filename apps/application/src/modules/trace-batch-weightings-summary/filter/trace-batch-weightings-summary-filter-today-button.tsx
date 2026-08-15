import { useShallow } from "zustand/react/shallow";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchWeightingsSummaryFilterStore } from "../store/use-trace-batch-weightings-summary-filter-store";

export default function TraceBatchWeightingsFilterTodayButton() {
  const setDayToToday = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useTraceBatchWeightingsSummaryFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton =
    filter.startDate === getCurrentDay().toJSON().slice(0, 10) &&
    filter.endDate === getCurrentDay().toJSON().slice(0, 10);

  const clearButtonProps: FilterButtonProps = {
    label: "Сегодня",
    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToToday(),
  };

  return <FilterButton {...clearButtonProps} />;
}
