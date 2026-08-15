import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useCansListPaginationStore } from "./store/use-cans-list-pagination-store";

export default function CansListPagination() {
  const paginationProps: PaginationProps = {
    page: useCansListPaginationStore(useShallow((state) => state.page)),
    total: useCansListPaginationStore(useShallow((state) => state.total)),
    limit: useCansListPaginationStore(useShallow((state) => state.limit)),
    increasePage: useCansListPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useCansListPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useCansListPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useCansListPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
