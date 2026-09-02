import React from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  useBoilBarcodeModalStore,
  useBoilInputStore,
  useBoilPaginationStore,
} from '@/entities/boil';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';

export function useBoilTable() {
  const filter = useBoilInputStore(useShallow((state) => state.filter));
  const setTotal = useBoilPaginationStore(useShallow((state) => state.setTotal));
  const limit = useBoilPaginationStore(useShallow((state) => state.limit));
  const page = useBoilPaginationStore(useShallow((state) => state.page));
  const setOpen = useBoilBarcodeModalStore(useShallow((state) => state.setOpen));
  const setBoil = useBoilBarcodeModalStore(useShallow((state) => state.setBoil));
  const setCode = useBoilBarcodeModalStore(useShallow((state) => state.setCode));
  const setMarking = useBoilBarcodeModalStore(useShallow((state) => state.setMarking));

  const { isLoading, data, isSuccess } = trpc.dash.main.boil.getBoilList.useQuery(
    { filter: filter, limit: limit, page: page },
    { refetchInterval: 10000, placeholderData: keepPreviousData },
  );

  const handleBarcodeButtonClick = ({
    code,
    boil,
    marking,
  }: {
    code: string | null;
    boil: string | null;
    marking: string | null;
  }) => {
    setCode(code ?? '-');
    setBoil(boil ?? '-');
    setMarking(marking ?? '-');
    setOpen(true);
  };

  React.useEffect(() => {
    if (data?.total !== undefined) {
      setTotal(data.total);
    }
  }, [data?.total, setTotal]);

  return {
    data,
    isLoading,
    isSuccess,
    handleBarcodeButtonClick,
  };
}
