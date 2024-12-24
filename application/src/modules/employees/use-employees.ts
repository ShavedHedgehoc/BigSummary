import { useQuery } from "@tanstack/react-query";
import EmployeeService from "../../services/EmployeeService";

export const useEmployees = (dto: FetchEmployeesDto) =>
  useQuery({
    queryKey: ["employees", dto],
    queryFn: () => EmployeeService.getEmployeeListWithParams(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
