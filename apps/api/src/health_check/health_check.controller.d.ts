import { HealthCheckService } from "./health_check.service";
export declare class HealthCheckController {
    private healthCheckService;
    constructor(healthCheckService: HealthCheckService);
    heathCheck(): Promise<{
        status: string;
    }>;
}
