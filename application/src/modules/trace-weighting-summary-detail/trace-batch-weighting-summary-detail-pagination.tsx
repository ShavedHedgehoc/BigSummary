import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";
import { useTraceBatchWeightingsSummaryDetailPaginationStore } from "./store/use-trace-batch-weightings-summary-detail-pagination-store";

export default function TraceBatchWeightingsSummaryDetailPagination() {
  const paginationProps: PaginationProps = {
    page: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.page)),
    total: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.total)),
    limit: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTraceBatchWeightingsSummaryDetailPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
