import { OnSeederInit } from "nestjs-sequelize-seeder";
export declare class SeedHistoryType implements OnSeederInit {
    run(): {
        value: string;
        description: string;
    }[];
}
