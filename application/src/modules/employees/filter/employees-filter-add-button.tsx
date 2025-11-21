import { useShallow } from "zustand/react/shallow";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";
import { useEmployeeAddModalStore } from "../store/use-employees-add-modal-store";

export default function EmployeesFilterAddButton() {
  const open = useEmployeeAddModalStore(useShallow((state) => state.open));
  const setOpen = useEmployeeAddModalStore(useShallow((state) => state.setOpen));

  const addButtonProps: FilterButtonProps = {
    label: "Добавить",
    disabled: open,
    startDecorator: <AddOutlinedIcon />,
    onClick: () => setOpen(true),
  };

  return <FilterButton {...addButtonProps} />;
}
