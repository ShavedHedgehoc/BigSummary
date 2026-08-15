import { Sequelize } from "sequelize";
import { UploadBoilDto } from "./dto/upload-boil-dto";
export declare class TraceDirectConnectionService {
    private readonly sequelize;
    constructor(sequelize: Sequelize);
    execInsertXML(dto: UploadBoilDto): Promise<{
        value: any;
    }>;
}
