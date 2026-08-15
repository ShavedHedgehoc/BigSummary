import { useConveyorsPaginationStore } from "./store/use-conveyors-pagination-store";
import { Pagination, PaginationProps } from "../../shared/components/pagination/pagination";
import { useShallow } from "zustand/react/shallow";

export default function ConveyorsPagination() {
  const paginationProps: PaginationProps = {
    page: useConveyorsPaginationStore(useShallow((state) => state.page)),
    total: useConveyorsPaginationStore(useShallow((state) => state.total)),
    limit: useConveyorsPaginationStore(useShallow((state) => state.limit)),
    increasePage: useConveyorsPaginationStore(useShallow((state) => state.increasePage)),
    decreasePage: useConveyorsPaginationStore(useShallow((state) => state.decreasePage)),
    setLimit: useConveyorsPaginationStore(useShallow((state) => state.setLimit)),
    setPage: useConveyorsPaginationStore(useShallow((state) => state.setPage)),
  };

  return <Pagination {...paginationProps} />;
}
