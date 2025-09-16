import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";
import { useInventoriesPaginationStore } from "./store/use-inventories-pagination-store";

export default function InventoriesPagination() {
  const paginationProps: PaginationProps = {
    page: useInventoriesPaginationStore(useShallow((state) => state.page)),
    total: useInventoriesPaginationStore(useShallow((state) => state.total)),
    limit: useInventoriesPaginationStore(useShallow((state) => state.limit)),
    increasePage: useInventoriesPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useInventoriesPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useInventoriesPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useInventoriesPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
