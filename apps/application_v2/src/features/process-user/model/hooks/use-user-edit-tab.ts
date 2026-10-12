import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { updateUserFormSchema, UpdateUserFormValues } from '../schema';
import { TApplicationUpdateUserInput, TApplicationUserItem } from '@repo/schemas';
import { useUpdateUser } from '../api/use-update-user';
import { trpc } from '@/shared/api';
import React from 'react';
import { ISelectorWithIconListItem } from '@/shared/ui';
import { useUserListUiParams } from '@/entities/user/index.client';

interface IUseProcessUserFormProps {
  row?: TApplicationUserItem;
}

export const useUserEditTab = ({ row }: IUseProcessUserFormProps) => {
  const { setParams: setUiParams } = useUserListUiParams();
  const defaultValues = React.useMemo(
    () => ({
      name: row?.name ?? '',
      email: row?.email ?? '',
      user_settings: {
        plant_id: row?.user_settings?.plant_id ?? null,
      },
    }),
    [row],
  );

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues,
  });

  const { control, reset } = form;
  const { updateUserAsync } = useUpdateUser();

  React.useEffect(() => {
    if (row) {
      reset(defaultValues);
    }
  }, [row, defaultValues, reset]);

  async function onSubmit(data: UpdateUserFormValues) {
    if (!row) return;
    try {
      const dto: TApplicationUpdateUserInput = {
        id: row.id,
        name: data.name,
        email: data.email,
        user_settings: data.user_settings,
      };
      await updateUserAsync(dto);
      reset(data);
      setUiParams({ selectedUserId: null });
    } catch (error) {
      console.error('Ошибка обновления пользователя', error);
    }
  }

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const plantListItems = React.useMemo<ISelectorWithIconListItem[]>(() => {
    const baseItems: ISelectorWithIconListItem[] = [{ value: 'All', description: 'Не выбрана' }];
    if (plantData && Array.isArray(plantData)) {
      const formattedPlants = plantData.map((plant) => ({
        value: String(plant.id),
        description: plant.value,
      }));
      baseItems.push(...formattedPlants);
    }

    return baseItems;
  }, [plantData]);
  const nameValue = useWatch({ control, name: 'name' });
  const emailValue = useWatch({ control, name: 'email' });

  const submitDisable = !nameValue || !emailValue;
  const { isSubmitting, isDirty } = form.formState;

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    form.reset(defaultValues);
  };

  return {
    form,
    onSubmit,
    plantListItems,
    submitDisable,
    isSubmitting,
    isDirty,
    handleReset,
  };
};
