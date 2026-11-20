import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { ITablePaginationProps } from '@/shared/ui';
import { employeeListColumns } from '../ui/columns';
import {
  EmployeeListParams,
  useEmployeeListSearchParams,
  useEmployeeListUiParams,
} from '@/entities/employee';

export function useEmployeeList() {
  const isMobile = useIsMobile();

  const { employeeListData, isLoading, occupationData, params, setParams } =
    useEmployeeListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useEmployeeListUiParams();

  const columns = useMemo(() => {
    const base = [...employeeListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedEmployeeId !== '';
  const targetId = uiParams.selectedEmployeeId ? Number(uiParams.selectedEmployeeId) : null;
  const selectedRow =
    employeeListData?.rows && targetId
      ? employeeListData.rows.find((row) => row.id === targetId)
      : undefined;

  const clearSelected = () => setUiParams({ selectedEmployeeId: null });

  const paginationProps: ITablePaginationProps<EmployeeListParams> = {
    total: employeeListData?.total ?? 0,
    totalPages: employeeListData?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    employeeListData,
    occupationData,
    isLoading,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
  };
}
