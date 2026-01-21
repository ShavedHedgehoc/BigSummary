import { useShallow } from "zustand/react/shallow";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeRecordsListFilterStore } from "../store/use-tube-records-list-filter-store";

export default function TubeRecordsListFilterTodayButton() {
  const setDayToToday = useTubeRecordsListFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useTubeRecordsListFilterStore(useShallow((state) => state.filter));

  const disableDocumentFilterTodayButton =
    filter.start_date === getCurrentDay().toJSON().slice(0, 10) &&
    filter.end_date === getCurrentDay().toJSON().slice(0, 10);

  const clearButtonProps: FilterButtonProps = {
    label: "Сегодня",
    disabled: disableDocumentFilterTodayButton,
    startDecorator: <CalendarMonthOutlinedIcon />,
    onClick: () => setDayToToday(),
  };

  return <FilterButton {...clearButtonProps} />;
}
