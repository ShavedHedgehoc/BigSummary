import { useQuery } from "@tanstack/react-query";
import TubeEmployeesService, { FetchTubeEmployeesDto } from "../../shared/api/services/tube-employees-service";

export const useTubeEmployees = (dto: FetchTubeEmployeesDto) =>
  useQuery({
    queryKey: ["tube_employees", dto],
    queryFn: () => TubeEmployeesService.getEmployeesList(dto),
    enabled: !!dto,
    refetchInterval: 1000 * 10,
  });
