import { UserRolesService } from "./user-roles.service";
export declare class UserRolesController {
    private userRoleService;
    constructor(userRoleService: UserRolesService);
    getListByUserId(id: string): Promise<{
        id: number;
        value: string;
        description: string;
    }[]>;
}
