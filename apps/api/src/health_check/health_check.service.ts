import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";

@Injectable()
export class HealthCheckService {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}
  async health() {
    const qry = `SELECT 1`;
    const [results, _] = await this.sequelize.query(qry);
    return { status: "success" };
  }
}
