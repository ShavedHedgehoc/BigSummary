import { Controller, useFormContext } from 'react-hook-form';
// import { LoginFormValues } from "../model/schema";
import { Button, ButtonGroup, Field, FieldError, FieldLabel, Input } from '@/shared/ui';
import { cn } from '@/shared/lib';
import { useState } from 'react';
import { Eye } from 'lucide-react';
import { TRegisterInput } from '@repo/schemas';

export function NameField() {
  const { control } = useFormContext<TRegisterInput>();
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="login-form-name">ФИО</FieldLabel>
          <Input
            {...field}
            id="login-form-name"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите ФИО"
            autoComplete="off"
            className={cn(
              'ring-0! ring-offset-0! shadow-none!',
              'outline-none! focus-visible:outline-none!',
              'focus:border-input focus-visible:border-input',
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function EmailField() {
  const { control } = useFormContext<TRegisterInput>();
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="login-form-email">Электропочта</FieldLabel>
          <Input
            {...field}
            id="login-form-email"
            aria-invalid={fieldState.invalid}
            placeholder="Пожалуйста, введите email"
            autoComplete="on"
            className={cn(
              'ring-0! ring-offset-0! shadow-none!',
              'outline-none! focus-visible:outline-none!',
              'focus:border-input focus-visible:border-input',
            )}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function PasswordField() {
  const { control } = useFormContext<TRegisterInput>();
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="login-form-password">Пароль</FieldLabel>
          <ButtonGroup>
            <Input
              {...field}
              id="login-form-password"
              type={isVisible ? 'text' : 'password'}
              aria-invalid={fieldState.invalid}
              placeholder="Пожалуйста, введите пароль"
              autoComplete="current-password"
              className={cn(
                'ring-0! ring-offset-0! shadow-none!',
                'outline-none! focus-visible:outline-none!',
                'focus:border-input focus-visible:border-input',
              )}
            />
            <Button
              variant="outline"
              className={cn(
                'border-l-0 ',
                'focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none',
              )}
              onClick={(e) => {
                e.preventDefault();
                setIsVisible(!isVisible);
              }}
            >
              <Eye />
            </Button>
          </ButtonGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
