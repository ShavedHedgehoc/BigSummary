import { Sequelize } from "sequelize";
import { UploadBoilDto } from "./dto/upload-boil-dto";
export declare class TestdbSqlService {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    getBatchs(): Promise<{
        total: number;
    }>;
    execInsertXML(dto: UploadBoilDto): Promise<{
        value: any;
    }>;
}
