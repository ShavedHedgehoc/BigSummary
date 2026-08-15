import { OnSeederInit } from "nestjs-sequelize-seeder";
export declare class SeedUser implements OnSeederInit {
    run(): {
        name: string;
        email: string;
        password: string;
    }[];
    everyone(data: any): any;
}
