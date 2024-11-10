import { useQuery } from "@tanstack/react-query";
import RoleService from "../../../services/RoleService";

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: () => RoleService.getAllRoles(),
    // refetchOnMount: false,
  });
