import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/UserService";

export const useUsers = (dto: FetchUsersDto) =>
  useQuery({
    queryKey: ["users", dto],
    queryFn: () => UserService.getUsersWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
