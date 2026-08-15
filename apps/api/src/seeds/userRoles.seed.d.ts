import { OnSeederInit } from "nestjs-sequelize-seeder";
export declare class SeedUserRole implements OnSeederInit {
    run(): ({
        roleId: number;
        userId: number;
        userid?: undefined;
    } | {
        roleId: number;
        userid: number;
        userId?: undefined;
    })[];
}
