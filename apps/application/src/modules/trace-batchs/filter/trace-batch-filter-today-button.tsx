import { useShallow } from "zustand/react/shallow";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { useTraceBatchsFilterStore } from "../store/use-trace-batchs-filter-store";

export default function TraceBatchsFilterTodayButton() {
  const setDayToToday = useTraceBatchsFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useTraceBatchsFilterStore(useShallow((state) => state.filter));

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
