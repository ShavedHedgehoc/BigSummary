import { useQuery } from "@tanstack/react-query";
import RoleService from "./services/roles-service";
import { useUsersFilterStore } from "../../modules/users/store/use-users-filter-store";

export const useRoles = () => {
  const { fillRoleSelectorOptions } = useUsersFilterStore();
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const data = await RoleService.getAllRoles();
      if (data) {
        fillRoleSelectorOptions(data);
      }
      return data;
    },
  });
};
