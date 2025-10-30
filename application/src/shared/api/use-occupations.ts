import { useQuery } from "@tanstack/react-query";
import OccupationService from "./services/occupation-service";
import { useEmployeesFilterStore } from "../../modules/employees/store/use-employees-filter-store";
import { useEmployeesEditModalStore } from "../../modules/employees/store/use-employees-edit-modal-store";
import { useEmployeeAddModalStore } from "../../modules/employees/store/use-employees-add-modal-store";

export const useOccupations = () => {
  const { fillOccupationSelectorOptions: fillEmployeesOptions } = useEmployeesFilterStore();
  const { fillOccupationOptions: fillEmployeesEditModalOccupationsOptions } = useEmployeesEditModalStore();
  const { fillOccupationOptions: fillEmployeesAddModalOccupationsOptions } = useEmployeeAddModalStore();
  return useQuery({
    queryKey: ["occupations"],
    queryFn: async () => {
      const data = await OccupationService.getOccupations();
      if (data) {
        fillEmployeesOptions(data);
        fillEmployeesEditModalOccupationsOptions(data);
        fillEmployeesAddModalOccupationsOptions(data);
      }
      return data;
    },
  });
};
