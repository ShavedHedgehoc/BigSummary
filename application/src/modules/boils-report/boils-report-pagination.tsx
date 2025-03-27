import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";
import { useBoilsReportPaginationStore } from "./store/use-boils-report-pagination-store";

export default function BoilsReportPagination() {
  const paginationProps: PaginationProps = {
    page: useBoilsReportPaginationStore(useShallow((state) => state.page)),
    total: useBoilsReportPaginationStore(useShallow((state) => state.total)),
    limit: useBoilsReportPaginationStore(useShallow((state) => state.limit)),
    increasePage: useBoilsReportPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useBoilsReportPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useBoilsReportPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useBoilsReportPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
