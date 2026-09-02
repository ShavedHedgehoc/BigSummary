import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { trpc } from '@/shared/api';
import { loginFormSchema, LoginFormValues } from './schema';

export const useAuthForm = (isRegister: boolean) => {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const registerMutation = trpc.auth.register.useMutation();
  const loginMutation = trpc.auth.login.useMutation();
  const utils = trpc.useUtils();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: '', password: '', name: '', isRegister },
  });

  useEffect(() => {
    form.setValue('isRegister', isRegister);
  }, [isRegister, form]);

  const isPending =
    form.formState.isSubmitting ||
    registerMutation.isPending ||
    loginMutation.isPending ||
    isSuccess;

  async function onSubmit(data: LoginFormValues) {
    try {
      let authResponse;

      if (data.isRegister) {
        authResponse = await registerMutation.mutateAsync({
          email: data.email,
          password: data.password,
          name: data.name ?? '',
        });
        toast.success('Регистрация успешна!');
      } else {
        authResponse = await loginMutation.mutateAsync({
          email: data.email,
          password: data.password,
        });
        toast.success('Вход выполнен!');
      }

      if (authResponse?.user) {
        utils.auth.me.setData(undefined, authResponse.user);
        setIsSuccess(true);
        router.push('/');
        router.refresh();
        form.reset();
      } else {
        throw new Error('Не удалось получить данные профиля от сервера');
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Произошла ошибка при авторизации';
      toast.error(errMsg);
      console.error('Auth error:', error);
    }
  }

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isPending,
  };
};
