import { useQuery } from "@tanstack/react-query";
import RoleService from "../../shared/api/services/RoleService";

export const useRoles = () =>
  useQuery({
    queryKey: ["roles"],
    queryFn: () => RoleService.getAllRoles(),
  });
