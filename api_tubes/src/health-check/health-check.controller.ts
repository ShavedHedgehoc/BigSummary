import { Controller, Get } from "@nestjs/common";
import { HealthCheckService } from "./health-check.service";
import { ApiOperation } from "@nestjs/swagger";

@Controller("health-check")
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  @ApiOperation({ summary: "Проверка доступности API" })
  @Get("/")
  checkHealth() {
    return this.healthCheckService.checkHeath();
  }
}
