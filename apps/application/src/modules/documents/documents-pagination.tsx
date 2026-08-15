import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";
import { useDocumentsPaginationStore } from "./store/use-documents-pagination-store";

export default function DocumentsPagination() {
  const paginationProps: PaginationProps = {
    page: useDocumentsPaginationStore(useShallow((state) => state.page)),
    total: useDocumentsPaginationStore(useShallow((state) => state.total)),
    limit: useDocumentsPaginationStore(useShallow((state) => state.limit)),
    increasePage: useDocumentsPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useDocumentsPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useDocumentsPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useDocumentsPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
