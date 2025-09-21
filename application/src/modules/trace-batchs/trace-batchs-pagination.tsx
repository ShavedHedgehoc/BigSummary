import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";
import { useTraceBatchsPaginationStore } from "./store/use-trace-batchs-pagination-store";

export default function TraceBatchsPagination() {
  const paginationProps: PaginationProps = {
    page: useTraceBatchsPaginationStore(useShallow((state) => state.page)),
    total: useTraceBatchsPaginationStore(useShallow((state) => state.total)),
    limit: useTraceBatchsPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTraceBatchsPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTraceBatchsPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTraceBatchsPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTraceBatchsPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
