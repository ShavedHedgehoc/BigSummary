import { useQuery } from "@tanstack/react-query";
import OccupationService from "./services/occupation-service";
import { useEmployeesFilterStore } from "../../modules/employees/store/use-employees-filter-store";

export const useOccupations = () => {
  const { fillOccupationSelectorOptions: fillEmployeesOptions } = useEmployeesFilterStore();
  return useQuery({
    queryKey: ["occupations_options", "employees"],
    queryFn: async () => {
      const data = await OccupationService.getOccupations();
      if (data) {
        fillEmployeesOptions(data);
      }
      return data;
    },
  });
};
