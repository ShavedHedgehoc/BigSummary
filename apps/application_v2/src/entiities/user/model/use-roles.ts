import { DB_ROLES } from '@/shared/constants';
import { useAuth } from './use-auth';

export function useRoles() {
    const { user } = useAuth();

    const userRoles = user?.roles || [];

    const isAdmin = userRoles.includes(DB_ROLES.ADMIN);
    const isPlanner = userRoles.includes(DB_ROLES.PLANNER);
    const isLaboratory = userRoles.includes(DB_ROLES.LABORATORY);


    const hasRole = (role: string | string[]) => {
        if (Array.isArray(role)) {
            return role.some((r) => userRoles.includes(r));
        }
        return userRoles.includes(role);
    };

    return {
        roles: userRoles,
        isAdmin,
        isPlanner,
        isLaboratory,
        hasRole,
    };
}
