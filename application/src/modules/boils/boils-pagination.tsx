import { useBoilsPaginationStore } from "./store/use-boils-pagination-store";
import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/shallow";

export default function BoilsPagination() {
  const paginationProps: PaginationProps = {
    page: useBoilsPaginationStore(useShallow((state) => state.page)),
    total: useBoilsPaginationStore(useShallow((state) => state.total)),
    limit: useBoilsPaginationStore(useShallow((state) => state.limit)),
    increasePage: useBoilsPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useBoilsPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useBoilsPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useBoilsPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
