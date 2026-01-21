import { useShallow } from "zustand/react/shallow";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeTresholdsExtrusionFormModalStore } from "../store/use-form-modals-store";

export default function TubeTrsholdsFilterAddButton() {
  const open = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.open));
  const setOpen = useTubeTresholdsExtrusionFormModalStore(useShallow((state) => state.setOpen));

  const addButtonProps: FilterButtonProps = {
    label: "Добавить",
    disabled: open,
    startDecorator: <AddOutlinedIcon />,
    onClick: () => setOpen(true),
  };

  return <FilterButton {...addButtonProps} />;
}
