import UserRoles from "./user-roles.model";
export declare class UserRolesService {
    private userRoleRepository;
    constructor(userRoleRepository: typeof UserRoles);
    getRolesListByUserId(id: number): Promise<{
        id: number;
        value: string;
        description: string;
    }[]>;
    getRolesIdsByUserId(id: number): Promise<number[]>;
    getRolesValuesByUserId(id: number): Promise<string[]>;
    getRowByUserIdAndRoleId(userId: number, roleId: number): Promise<UserRoles>;
    removeRecord(id: number): Promise<void>;
    addRecord(userId: number, roleId: number): Promise<UserRoles>;
}
