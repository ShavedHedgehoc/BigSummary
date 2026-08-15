import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useUsersPaginationStore } from "./store/use-users-pagination-store";

export default function UsersPagination() {
  const paginationProps: PaginationProps = {
    page: useUsersPaginationStore(useShallow((state) => state.page)),
    total: useUsersPaginationStore(useShallow((state) => state.total)),
    limit: useUsersPaginationStore(useShallow((state) => state.limit)),
    increasePage: useUsersPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useUsersPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useUsersPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useUsersPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
