// "trace_test_db_connection"
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TestdbSqlService } from "./testdb_sql.service";
import { TestdbSqlController } from "./testdb_sql.controller";

@Module({
  providers: [TestdbSqlService],
  imports: [SequelizeModule.forFeature([], "trace_test_db_connection")],
  controllers: [TestdbSqlController],
  exports: [TestdbSqlService],
})
export class TestdbSqlModule {}
