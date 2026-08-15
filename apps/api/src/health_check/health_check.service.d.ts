import { Sequelize } from "sequelize";
export declare class HealthCheckService {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    health(): Promise<{
        status: string;
    }>;
}
