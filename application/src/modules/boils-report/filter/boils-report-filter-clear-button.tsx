import { useShallow } from "zustand/react/shallow";
import { useBoilsReportFilterStore } from "../store/use-boils-report-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";

export default function BoilsReportFilterClearButton() {
  const clearFilter = useBoilsReportFilterStore(useShallow((state) => state.clearFilter));
  const filter = useBoilsReportFilterStore(useShallow((state) => state.filter));

  const disableClearButtonCondition =
    filter.boil === "" &&
    filter.marking === "" &&
    filter.baseCode === "" &&
    filter.states.length === 0 &&
    filter.plants.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableClearButtonCondition,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
