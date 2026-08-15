import { TestdbSqlService } from "./testdb_sql.service";
import { UploadBoilDto } from "./dto/upload-boil-dto";
export declare class TestdbSqlController {
    private testsqlService;
    constructor(testsqlService: TestdbSqlService);
    UploadBoil(dto: UploadBoilDto): Promise<{
        value: any;
    }>;
}
