'use client';

import { FormProvider, Controller } from 'react-hook-form';
import { Button, Checkbox, ScrollArea } from '@/shared/ui';
import { TApplicationUserItem } from '@repo/schemas';
import { useUserRoleTab } from '../model/hooks/use-user-roles-tab';

interface IUserRolesTabProps {
  row?: TApplicationUserItem;
}

export function UserRolesTab({ row }: IUserRolesTabProps) {
  const { form, onRolesSubmit, roleData, handleReset, isPending } = useUserRoleTab({ row });

  if (!row) return null;

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onRolesSubmit)}
        className="flex flex-col flex-1 justify-between min-h-0"
      >
        <ScrollArea className="flex-1 h-50 border rounded-md p-2 bg-background/50">
          <Controller
            control={form.control}
            name="roles"
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                {(roleData ?? []).map((role) => {
                  const isChecked = field.value?.includes(role.id);
                  const isRoleDisabled = role.value === 'USER';
                  const handleToggle = () => {
                    if (isRoleDisabled) return;
                    const newValue = isChecked
                      ? field.value.filter((id) => id !== role.id)
                      : [...(field.value || []), role.id];
                    field.onChange(newValue);
                  };

                  return (
                    <div
                      key={role.id}
                      className="flex flex-row items-center space-x-3 rounded-md border p-3 transition-colors hover:bg-muted/40 bg-card cursor-pointer"
                      onClick={handleToggle}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={handleToggle}
                        onClick={(e) => e.stopPropagation()}
                        disabled={role.value === 'USER'}
                      />

                      <span className="text-xs font-medium cursor-pointer flex-1 select-none text-foreground">
                        {role.description || role.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </ScrollArea>
        <div className="flex items-center justify-end gap-2 border-t pt-4 bg-card mt-4">
          {form.formState.isDirty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isPending}
              onClick={handleReset}
            >
              Сбросить
            </Button>
          )}
          <Button type="submit" size="sm" disabled={isPending || !form.formState.isDirty}>
            {isPending ? 'Сохранение...' : 'Сохранить роли'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
