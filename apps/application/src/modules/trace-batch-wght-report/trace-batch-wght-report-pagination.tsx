import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useTraceBatchWghtReportPaginationStore } from "./store/use-trace-batch-wght-report-pagination-store";

export default function TraceBatchWghtReportPagination() {
  const paginationProps: PaginationProps = {
    page: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.page)),
    total: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.total)),
    limit: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.limit)),
    extPerPage: true,
    increasePage: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTraceBatchWghtReportPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
