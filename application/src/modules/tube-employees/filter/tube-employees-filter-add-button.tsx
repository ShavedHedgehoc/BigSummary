import { useShallow } from "zustand/react/shallow";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useTubeEmployeesAddModalStore } from "../store/use-tube-employees-add-modal-store";

export default function TubeEmployeesFilterAddButton() {
  const open = useTubeEmployeesAddModalStore(useShallow((state) => state.open));
  const setOpen = useTubeEmployeesAddModalStore(useShallow((state) => state.setOpen));

  const addButtonProps: FilterButtonProps = {
    label: "Добавить",
    disabled: open,
    startDecorator: <AddOutlinedIcon />,
    onClick: () => setOpen(true),
  };

  return <FilterButton {...addButtonProps} />;
}
