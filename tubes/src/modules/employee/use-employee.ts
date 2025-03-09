import { UseQueryResult, useQuery } from "@tanstack/react-query";
import EmployeeService, { EmployeeResponse } from "../../shared/api/services/employee-service";

export const useEmployee = (barcode: string): UseQueryResult<EmployeeResponse> =>
  useQuery({
    queryKey: ["employee"],
    queryFn: () => EmployeeService.getByBarcode(barcode),
    enabled: !!barcode,
  });
