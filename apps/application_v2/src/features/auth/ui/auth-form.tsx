'use client';

import { FieldGroup, FormLayout } from '@/shared/ui';
import { FormProvider } from 'react-hook-form';
import { useAuthForm } from '../model/use-form';
import { FormFooter } from './form-footer';
import { EmailField, NameField, PasswordField } from './form-fields';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const AuthForm = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const isRegister = mode === 'register';
  const { form, onSubmit, isSubmitting } = useAuthForm(isRegister);

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    form.reset();
  };

  return (
    <FormProvider {...form}>
      {isSubmitting && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-background/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-sm font-medium animate-pulse">Загрузка ...</p>
          </div>
        </div>
      )}

      <FormLayout
        title={isRegister ? 'Регистрация' : 'Вход в приложение'}
        description="Войдите в аккаунт или зарегистрируйтесь"
        footer={
          <FormFooter createPending={isSubmitting} isRegister={isRegister} toggle={toggleMode} />
        }
      >
        <form id="login-form" onSubmit={onSubmit}>
          <FieldGroup>
            <div className="flex flex-col gap-6">
              {isRegister && <NameField />}
              <EmailField />
              <PasswordField />
            </div>
          </FieldGroup>
        </form>
      </FormLayout>
    </FormProvider>
  );
};
