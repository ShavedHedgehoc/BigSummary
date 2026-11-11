import { Button, Input } from '@/shared/ui';
import { TApplicationConveyorItem } from '@repo/schemas';
import { RotateCcw, Save } from 'lucide-react';

import { Controller, FormProvider } from 'react-hook-form';
import { useEditConveyorForm } from '../model/use-form';

interface IEditConveyorFormProps {
  row?: TApplicationConveyorItem;
}

export function EditConveyorForm({ row }: IEditConveyorFormProps) {
  const { form, onSubmit, submitDisable, resetDisable } = useEditConveyorForm({ row });
  const { control, reset } = form;
  if (!row) return null;

  return (
    <FormProvider {...form}>
      <form
        id="edit-doc-row-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col grow p-4 gap-4"
      >
        <div className="flex flex-col gap-2.5">
          <p className="text-lg">{`Конвейер: ${row.value}`}</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">Штрихкод</label>
            <Controller
              name="barcode"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex flex-col gap-1 w-full">
                  <Input {...field} value={field.value ?? ''} className="h-9 text-sm" />
                  {fieldState.error?.message && (
                    <p className="text-xs text-destructive mt-1">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t mt-auto">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={resetDisable}
            onClick={() => reset()}
            className="text-muted-foreground hover:text-foreground hover:bg-muted font-medium text-sm transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Сбросить</span>
          </Button>
          <Button
            type="submit"
            variant="outline"
            size="sm"
            disabled={submitDisable}
            className="text-sm transition-all px-5 disabled:bg-muted disabled:text-muted-foreground/50 disabled:opacity-100 disabled:pointer-events-none"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Записать</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
