import { useDashFilterStore } from "./store/dash-filter-store";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useShallow } from "zustand/shallow";
import FilterSwitchButton, { FilterSwitchButtonProps } from "../../shared/ui/filter-switch-button";

export default function DashFilterSwitcher() {
  const smallCardView = useDashFilterStore(useShallow((state) => state.smallCardView));
  const setSmallCardView = useDashFilterStore(useShallow((state) => state.setSmallCardView));
  const switchButtonProps: FilterSwitchButtonProps = {
    falseDecorator: <AddCircleOutlineIcon />,
    trueDecorator: <RemoveCircleOutlineIcon />,
    condition: smallCardView,
    onClick: () => setSmallCardView(!smallCardView),
  };
  return <FilterSwitchButton {...switchButtonProps} />;
}
