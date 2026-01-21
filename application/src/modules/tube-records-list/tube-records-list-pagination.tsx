import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useTubeRecordsListPaginationStore } from "./store/use-tube-records-list-pagination-store";

export default function TubeRecordsListPagination() {
  const paginationProps: PaginationProps = {
    page: useTubeRecordsListPaginationStore(useShallow((state) => state.page)),
    total: useTubeRecordsListPaginationStore(useShallow((state) => state.total)),
    limit: useTubeRecordsListPaginationStore(useShallow((state) => state.limit)),
    increasePage: useTubeRecordsListPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useTubeRecordsListPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useTubeRecordsListPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useTubeRecordsListPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
