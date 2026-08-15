import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import Role from "./roles.model";
export declare class RolesController {
    private roleService;
    constructor(roleService: RolesService);
    create(roleDto: CreateRoleDto): Promise<Role>;
    getByValue(value: string): Promise<Role>;
    getAll(): Promise<Role[]>;
}
