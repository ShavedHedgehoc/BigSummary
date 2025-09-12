import { useShallow } from "zustand/shallow";

import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { getCurrentDay } from "../../../shared/helpers/date-time-formatters";
import { useInventoriesFilterStore } from "../store/use-inventories-filter-store";

export default function InventoriesFilterTodayButton() {
  const setDayToToday = useInventoriesFilterStore(useShallow((state) => state.setDayToToday));
  const filter = useInventoriesFilterStore(useShallow((state) => state.filter));

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
