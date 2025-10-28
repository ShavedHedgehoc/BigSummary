import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useEmployeesPaginationStore } from "./store/use-employees-pagination-store";

export default function EmployeesPagination() {
  const paginationProps: PaginationProps = {
    page: useEmployeesPaginationStore(useShallow((state) => state.page)),
    total: useEmployeesPaginationStore(useShallow((state) => state.total)),
    limit: useEmployeesPaginationStore(useShallow((state) => state.limit)),
    increasePage: useEmployeesPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useEmployeesPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useEmployeesPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useEmployeesPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
