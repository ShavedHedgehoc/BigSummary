import { useQuery } from "@tanstack/react-query";
import UserService from "../../../../services/UserService";

// const GetFilter = (): IEmployeeGetDto => {
//   const page = usePaginationStore.getState().page;
//   const perPage = usePaginationStore.getState().perPage;
//   const nameFilter = useNameFilterStore.getState().nameFilter;
//   const occupations = useOccupationsFilterStore.getState().occupations;
//   const nameAsc = useNameSortOrderStore.getState().asc;
//   const filter: IEmployeeFilter = { occupations: occupations, nameFilter: nameFilter, nameAsc: nameAsc };
//   return { filter: filter, page: page, limit: perPage };
// };

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => UserService.getUsersWithParams(),
    // refetchOnMount: false,
  });
