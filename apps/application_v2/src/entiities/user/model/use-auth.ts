import { trpc } from '@/shared/api';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function useAuth() {
    const pathname = usePathname();
    const router = useRouter();
    const utils = trpc.useUtils();

    const isPublicPage = pathname === '/login' || pathname === '/register';

    const {
        data: user,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = trpc.auth.me.useQuery(undefined, {
        enabled: !isPublicPage,
        staleTime: 0,
    });

    const logoutMutation = trpc.auth.logout.useMutation({
        onSuccess: async () => {
            utils.auth.me.setData(undefined, undefined);
            toast.success('Вы успешно вышли из системы');
            router.push('/login');
        },
        onError: (err) => {
            toast.error(err.message || 'Не удалось выйти из системы');
        },
    });

    return {
        user: user ?? null,
        isLoading: isLoading || (isFetching && !user),
        isFetching,
        isError,
        isAuthenticated: !!user,
        error,
        refetch,
        logout: logoutMutation.mutate,
        isLoggingOut: logoutMutation.isPending,
    };
}
