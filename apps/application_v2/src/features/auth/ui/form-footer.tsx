import { Button, Field } from '@/shared/ui';
import { Loader2 } from 'lucide-react';

export function FormFooter({
  createPending,
  isRegister,
  toggle,
}: {
  createPending: boolean;
  isRegister: boolean;
  toggle: () => void;
}) {
  return (
    <Field orientation="vertical" className="flex flex-col gap-6 mt-4">
      <Field orientation="horizontal" className="justify-start flex flex-row">
        <Button type="submit" form="login-form" disabled={createPending} className="w-full">
          {createPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </Button>
      </Field>
      <Field orientation="horizontal" className="justify-end flex flex-row ">
        <p className="text-sm text-muted-foreground">
          {isRegister ? 'Уже зарегистрированы? ' : 'Нет аккаунта? '}
          <span
            onClick={toggle}
            className="text-primary font-bold  cursor-pointer  transition-colors leading-none pb-0.5"
          >
            {isRegister ? 'Войти' : 'Создать'}
          </span>
        </p>
      </Field>
    </Field>
  );
}
