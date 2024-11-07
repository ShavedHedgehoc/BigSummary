import { useNameSortOrderStore } from "./useNameSortOrderStore";
import { useNameFilterStore } from "./useNameFilterStore";
import { useOccupationsFilterStore } from "./useOccupationsFilterStore";
import { useQuery } from "@tanstack/react-query";
import EmployeeService, { IEmployeeFilter, IEmployeeGetDto } from "../../../../services/EmployeeService";
import { usePaginationStore } from "./usePaginationStore";

const GetFilter = (): IEmployeeGetDto => {
  const page = usePaginationStore.getState().page;
  const perPage = usePaginationStore.getState().perPage;
  const nameFilter = useNameFilterStore.getState().nameFilter;
  const occupations = useOccupationsFilterStore.getState().occupations;
  const nameAsc = useNameSortOrderStore.getState().asc;
  const filter: IEmployeeFilter = { occupations: occupations, nameFilter: nameFilter, nameAsc: nameAsc };
  return { filter: filter, page: page, limit: perPage };
};

export const useEmployees = () =>
  useQuery({
    queryKey: ["employees"],
    queryFn: () => EmployeeService.getEmployeeListWithParams(GetFilter()),
    // refetchOnMount: false,
  });
