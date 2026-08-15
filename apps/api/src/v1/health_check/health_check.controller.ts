import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HealthCheckService } from "./health_check.service";

@ApiTags("Health check")
@Controller("health-check")
export class HealthCheckController {
  constructor(private healthCheckService: HealthCheckService) {}
  @Get("/")
  heathCheck() {
    return this.healthCheckService.health();
  }
}
