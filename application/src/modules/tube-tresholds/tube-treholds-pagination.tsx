import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useTubeTresholdsPaginationStore } from "./store/use-tube-tresholds-pagination-store";

export default function TubeTresholdsPagination() {
  const paginationProps: PaginationProps = {
    page: useTubeTresholdsPaginationStore(useShallow((state) => state.page)),
    total: useTubeTresholdsPaginationStore(useShallow((state) => state.total)),
    limit: useTubeTresholdsPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTubeTresholdsPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTubeTresholdsPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTubeTresholdsPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTubeTresholdsPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
