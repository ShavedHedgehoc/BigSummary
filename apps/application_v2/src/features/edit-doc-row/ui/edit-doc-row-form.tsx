import { Button, Input, Textarea } from '@/shared/ui';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { RotateCcw, Save } from 'lucide-react';
import { useEditDocRowForm } from '../model';
import { Controller, FormProvider } from 'react-hook-form';

interface IEditDocRowFormProps {
  row?: TApplicationDocDetailRowItem;
}

export function EditDocRowForm({ row }: IEditDocRowFormProps) {
  const { form, onSubmit, submitDisable, resetDisable } = useEditDocRowForm({ row });
  const { control, setValue, reset } = form;
  if (!row) return null;

  return (
    <FormProvider {...form}>
      <form
        id="edit-doc-row-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col grow p-4 gap-4"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">Аппарат</label>
            <Controller
              name="apparatus"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={field.value === '-'}
                  value={field.value ?? ''}
                  className="h-9 text-sm"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">Емкость</label>
            <Controller
              name="can"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disabled={field.value === '-'}
                  value={field.value ?? ''}
                  className="h-9 text-sm"
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">Конвейер</label>
            <Controller
              name="conveyor"
              control={control}
              render={({ field }) => (
                <Input {...field} value={field.value ?? ''} className="h-9 text-sm" />
              )}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-medium text-muted-foreground">План</label>
            <Controller
              name="plan"
              control={control}
              render={({ field }) => (
                <Input
                  type="number"
                  {...field}
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value === '' ? undefined : Number(e.target.value))
                  }
                  className="h-9 text-sm"
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 relative group">
          <div className="flex justify-between items-center">
            <label className="text-[11px] font-medium text-muted-foreground">
              Примечание по продукту
            </label>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-[11px] text-muted-foreground hover:text-destructive transition-colors"
              onClick={() => setValue('note', '', { shouldDirty: true })}
            >
              Очистить
            </Button>
          </div>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <Textarea
                {...field}
                value={field.value ?? ''}
                rows={3}
                className="text-sm resize-none pr-4 bg-background border-muted"
                placeholder="Введите текст..."
              />
            )}
          />
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
