import { useQuery } from "@tanstack/react-query";
import UserService from "../../shared/api/services/user-service";

export const useUser = (id: number | null) =>
  useQuery({
    queryKey: ["user", id],
    queryFn: () => UserService.getUserById(id),
    enabled: !!id,
  });
