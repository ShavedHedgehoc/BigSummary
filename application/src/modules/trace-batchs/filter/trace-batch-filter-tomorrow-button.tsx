import { useShallow } from "zustand/shallow";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getTomorrowDate } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchsFilterStore } from "../store/use-trace-batchs-filter-store";

export default function TraceBatchsFilterTomorrowButton() {
  const setDayToTomorrow = useTraceBatchsFilterStore(useShallow((state) => state.setDayToTomorrow));
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton =
    filter.startDate === getTomorrowDate() && filter.endDate === getTomorrowDate();

  const clearButtonProps: FilterButtonProps = {
    label: "Завтра",

    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToTomorrow(),
  };

  return <FilterButton {...clearButtonProps} />;
}
