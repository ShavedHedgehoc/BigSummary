import { Button, Field, FieldError, FieldLabel, SelectorWithIcon, Textarea } from '@/shared/ui';
import { useAddHistoryForm } from '../model';
import { TApplicationDocDetailRowItem } from '@repo/schemas';
import { Controller, FormProvider } from 'react-hook-form';
import { ClipboardList, RotateCcw, Save } from 'lucide-react';

interface IAddHistoryFormProps {
  row?: TApplicationDocDetailRowItem;
  onSuccess: () => void;
}

export function AddHistoryForm({ row, onSuccess }: IAddHistoryFormProps) {
  const { form, onSubmit, resetDisable, submitDisable, states } = useAddHistoryForm({
    row,
    onSuccess,
  });
  if (!row) return;
  const { control, setValue, reset } = form;

  return (
    <FormProvider {...form}>
      <form
        id="edit-doc-row-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col grow p-4 gap-4"
      >
        <Controller
          name="state"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="edit-doc-row-form-state">Статус</FieldLabel>
              <SelectorWithIcon
                {...field}
                id="edit-doc-row-form-state"
                className="w-full text-xs"
                itemClassName="text-xs"
                icon={<ClipboardList />}
                items={states}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
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
