import { useShallow } from "zustand/react/shallow";
import { useUsersFilterStore } from "../store/use-users-filter-store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FilterButton, { FilterButtonProps } from "../../../shared/ui/filter-button";

export default function UsersFilterClearButton() {
  const clearFilter = useUsersFilterStore(useShallow((state) => state.clearFilter));
  const filter = useUsersFilterStore(useShallow((state) => state.filter));

  const disableBoilFilterClearButton =
    filter.name === "" && filter.email === "" && filter.roles.length === 0 && filter.banned.length === 0;

  const clearButtonProps: FilterButtonProps = {
    label: "Сбросить",
    disabled: disableBoilFilterClearButton,
    startDecorator: <DeleteOutlineIcon />,
    onClick: () => clearFilter(),
  };

  return <FilterButton {...clearButtonProps} />;
}
