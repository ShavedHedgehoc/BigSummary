import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBoilPaginationStore } from './use-boil-pagination-store';

export function useBoilPagination() {
  const page = useBoilPaginationStore(useShallow((state) => state.page));
  const total = useBoilPaginationStore(useShallow((state) => state.total));
  const limit = useBoilPaginationStore(useShallow((state) => state.limit));
  const increasePage = useBoilPaginationStore(useShallow((state) => state.increasePage));
  const decreasePage = useBoilPaginationStore(useShallow((state) => state.decreasePage));
  const setPage = useBoilPaginationStore(useShallow((state) => state.setPage));
  const pages = Math.ceil(total / limit);

  React.useEffect(() => {
    setPage(1);
  }, [limit, setPage]);

  React.useEffect(() => {
    if (pages > 0 && page > pages) {
      setPage(pages);
    }
  }, [pages, page, setPage]);

  const decreaseButtonsDisabled = page === 1 || total === 0;
  const increaseButtonsDisabled = page === pages || pages === 0;

  const handleFirstButtonClick = () => {
    if (!decreaseButtonsDisabled) {
      setPage(1);
    }
  };

  const handleDecreaseButtonClick = () => {
    if (!decreaseButtonsDisabled) {
      decreasePage();
    }
  };

  const handleIncreaseButtonClick = () => {
    if (!increaseButtonsDisabled) {
      increasePage();
    }
  };

  const handleLastButtonClick = () => {
    if (!increaseButtonsDisabled) {
      setPage(pages);
    }
  };

  return {
    page,
    pages,
    increaseButtonsDisabled,
    decreaseButtonsDisabled,
    handleFirstButtonClick,
    handleDecreaseButtonClick,
    handleIncreaseButtonClick,
    handleLastButtonClick,
  };
}
