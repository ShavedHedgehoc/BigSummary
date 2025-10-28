import { useShallow } from "zustand/react/shallow";
import { useQuery } from "@tanstack/react-query";
import FilterMultiSelector, {
  FilterMultiSelectorOption,
  FilterMultiSelectorProps,
} from "../../shared/ui/filter-multi-selector";
import { useUsersFilterStore } from "./store/use-users-filter-store";
import { UsersFilterParams } from "./users-filter-params";
import RoleService from "../../shared/api/services/roles-service";

export default function UsersFilterRolesSelector() {
  const filter = useUsersFilterStore(useShallow((state) => state.filter));
  const changeFilter = useUsersFilterStore(useShallow((state) => state.changeFilter));
  const roleSelectorOptions = useUsersFilterStore(useShallow((state) => state.roleSelectorOptions));
  const fillRoleSelectorOptions = useUsersFilterStore(useShallow((state) => state.fillRoleSelectorOptions));

  useQuery({
    queryKey: ["role_options"],
    queryFn: async () => {
      const data: IRole[] = await RoleService.getAllRoles();
      if (data) {
        fillRoleSelectorOptions(data);

        return data;
      }
    },
  });

  const roleOptions = roleSelectorOptions.map((role) => (
    <FilterMultiSelectorOption
      key={`state_option_${role.id}`}
      id={role.id}
      value={role.description}
      options={[...filter.roles]}
    />
  ));

  const stateSelectorProps: FilterMultiSelectorProps = {
    id: UsersFilterParams.ROLES,
    selectedOptions: filter.roles,
    placeholder: "Выберите роли",
    label: "Поиск по роли",
    options: roleOptions,
    changeFilter: ({ key, value, values }: { key: string; value: string; values: number[] | [] }) =>
      changeFilter({ key, value, values }),
  };

  return <FilterMultiSelector {...stateSelectorProps} />;
}
