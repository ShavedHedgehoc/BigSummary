import { type TApplicationUploadDocRecordRowValError as ValError } from '@repo/schemas';
import { Ban, CircleQuestionMark, FileCheck, Loader2 } from 'lucide-react';

const MAX_ERRORS_LENGTH = 1000 as const;
export interface ValidationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isValid: boolean;
  isPending: boolean;
  errors: ValError[] | null;
  hasFile?: boolean;
}

export function ValidationStatusButton({
  isValid,
  isPending,
  errors,
  hasFile = false,
}: ValidationButtonProps) {
  const hasErrors = errors && errors.length > 0;
  const canViewErrors = hasErrors && errors.length < MAX_ERRORS_LENGTH;

  return (
    <div className="flex w-full">
      {isPending ? (
        <div className="flex flex-row gap-2 w-full items-center justify-left ">
          <Loader2 className="h-4 w-4  shrink-0 animate-spin" />
          Проверяю...
        </div>
      ) : hasFile && isValid ? (
        <div className="flex flex-row gap-2 w-full items-center justify-left text-emerald-700 bg-emerald-50 dark:bg-transparent dark:text-emerald-300 text-xs dark:border dark:border-emerald-300 rounded-md p-2">
          <FileCheck className="h-4 w-4 shrink-0" />
          Успешная проверка. Можно загружать.
        </div>
      ) : hasFile && errors?.length ? (
        <div className="flex flex-row gap-2 w-full items-center justify-start text-destructive bg-red-50 dark:bg-transparent text-xs dark:border dark:border-destructive rounded-md p-2">
          <Ban className="h-4 w-4 shrink-0" />
          <span className="whitespace-normal text-left wrap-break-words">
            {`В файле ${errors.length} ошибок. ${canViewErrors ?? 'Просмотр не доступен'}`}
          </span>
        </div>
      ) : (
        <div className="flex flex-row gap-2 w-full items-center justify-start text-muted-foreground/50 border border-dashed border-muted-foreground/50 bg-card text-xs d rounded-md p-2">
          <CircleQuestionMark className="h-4 w-4 shrink-0" />
          <span className="whitespace-normal text-left wrap-break-words">Статус проверки</span>
        </div>
      )}
    </div>
  );
}
