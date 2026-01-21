import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useTubeEmployeesPaginationStore } from "./store/use-tube-employees-pagination-store";

export default function TubeEmployeesPagination() {
  const paginationProps: PaginationProps = {
    page: useTubeEmployeesPaginationStore(useShallow((state) => state.page)),
    total: useTubeEmployeesPaginationStore(useShallow((state) => state.total)),
    limit: useTubeEmployeesPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTubeEmployeesPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTubeEmployeesPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTubeEmployeesPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTubeEmployeesPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
