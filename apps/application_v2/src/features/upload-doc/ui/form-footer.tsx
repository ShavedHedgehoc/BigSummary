import { Button, Field } from '@/shared/ui';
import { useFormContext } from 'react-hook-form';

export function FormFooter({
  fileInputRef,
  resetCustom,
  resetDisable,
  submitDisable,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  resetCustom: () => void;
  resetDisable: boolean;
  submitDisable: boolean;
}) {
  const { reset } = useFormContext();
  const handleFullReset = () => {
    reset();
    resetCustom();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <Field orientation="horizontal" className="mt-4 justify-end flex flex-row w-full gap-2">
      <Button variant="ghost" disabled={resetDisable} onClick={handleFullReset}>
        Очистить
      </Button>
      <Button type="submit" variant="outline" form="upload-doc-form" disabled={submitDisable}>
        Загрузить
      </Button>
    </Field>
  );
}
