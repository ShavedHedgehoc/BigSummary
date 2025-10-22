import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";
import { useTrademarksPaginationStore } from "./store/use-trademarks-pagination-store";

export default function TrademarksPagination() {
  const paginationProps: PaginationProps = {
    page: useTrademarksPaginationStore(useShallow((state) => state.page)),
    total: useTrademarksPaginationStore(useShallow((state) => state.total)),
    limit: useTrademarksPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTrademarksPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTrademarksPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTrademarksPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTrademarksPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
