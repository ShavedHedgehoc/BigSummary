import { RolesService } from "src/roles/roles.service";
import { UserRolesService } from "src/user-roles/user-roles.service";
import { UsersService } from "src/users/users.service";
export declare class UserRolesListService {
    private userRoleService;
    private roleService;
    private userService;
    constructor(userRoleService: UserRolesService, roleService: RolesService, userService: UsersService);
    changeUserRole(userId: number, roleValue: string): Promise<any>;
}
