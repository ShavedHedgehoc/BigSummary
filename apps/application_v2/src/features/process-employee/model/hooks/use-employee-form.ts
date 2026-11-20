import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';

import {
  TApplicationCreateEmployeeInput,
  TApplicationEmployeeItem,
  TApplicationUpdateEmployeeInput,
} from '@repo/schemas';

import { trpc } from '@/shared/api';
import { ISelectorWithIconListItem } from '@/shared/ui';
import { useEmployeeListUiParams } from '@/entities/employee';
import { employeeFormSchema, EmployeeFormValues } from '../schema';
import { useUpdateEmployee } from '../api/use-update-employee';
import { useCreateEmployee } from '../api/use-create-employee';

export type TEmployeeFormMode = 'create' | 'edit';

interface IUseEmployeeFormProps {
  mode: TEmployeeFormMode;
  row?: TApplicationEmployeeItem;
  onSuccess?: () => void;
}

export const useEmployeeForm = ({ mode, row, onSuccess }: IUseEmployeeFormProps) => {
  const isEditMode = mode === 'edit';
  const { setParams: setUiParams } = useEmployeeListUiParams();

  const defaultValues = React.useMemo<EmployeeFormValues>(
    () => ({
      name: isEditMode ? (row?.name ?? '') : '',
      barcode: isEditMode ? (row?.barcode ?? '') : '',
      occupationId: isEditMode ? (row?.occupation?.id ?? null) : null,
    }),
    [isEditMode, row],
  );

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  });

  const { control, reset } = form;
  const { updateEmployeeAsync } = useUpdateEmployee();
  const { createEmployeeAsync } = useCreateEmployee();

  React.useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  async function onSubmit(data: EmployeeFormValues) {
    try {
      if (mode === 'edit') {
        if (!row) {
          console.error('Для режима редактирования не передан row');
          return;
        }
        const updateDto: TApplicationUpdateEmployeeInput = {
          id: row.id,
          name: data.name,
          barcode: data.barcode,
          occupation: {
            occupationId: data.occupationId,
          },
        };
        await updateEmployeeAsync(updateDto);
        reset(data);
        setUiParams({ selectedEmployeeId: null });
      } else {
        const createDto: TApplicationCreateEmployeeInput = {
          name: data.name,
          barcode: data.barcode,
          occupation: {
            occupationId: data.occupationId,
          },
        };
        await createEmployeeAsync(createDto);
        reset(defaultValues);
        setUiParams({ selectedEmployeeId: null });
      }

      onSuccess?.();
    } catch (error) {
      console.error(
        mode === 'edit' ? 'Ошибка обновления сотрудника' : 'Ошибка создания сотрудника',
        error,
      );
    }
  }

  const { data: occupationData } = trpc.application.main.occupation.getOccupationList.useQuery(
    undefined,
    {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    },
  );

  const occupationListItems = React.useMemo<ISelectorWithIconListItem[]>(() => {
    const baseItems: ISelectorWithIconListItem[] = [{ value: 'All', description: 'Не выбрана' }];
    if (occupationData && Array.isArray(occupationData)) {
      const formattedOccupations = occupationData.map((occupation) => ({
        value: String(occupation.id),
        description: occupation.description,
      }));
      baseItems.push(...formattedOccupations);
    }
    return baseItems;
  }, [occupationData]);

  const nameValue = useWatch({ control, name: 'name' });
  const barcodeValue = useWatch({ control, name: 'barcode' });
  const occupationValue = useWatch({ control, name: 'occupationId' });

  const isOccupationSelected = Boolean(occupationValue);
  const submitDisable = !nameValue?.trim() || !barcodeValue?.trim() || !isOccupationSelected;

  const { isSubmitting, isDirty } = form.formState;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    reset(defaultValues);
  };

  return {
    form,
    mode,
    isEditMode,
    onSubmit,
    occupationListItems,
    submitDisable,
    isSubmitting,
    isDirty,
    handleReset,
  };
};
