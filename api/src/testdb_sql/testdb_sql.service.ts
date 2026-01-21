import { Injectable } from "@nestjs/common";

import { InjectConnection } from "@nestjs/sequelize";

import sequelize, { Sequelize } from "sequelize";
import * as xmljs from "xml-js";
import { UploadBoilDto } from "./dto/upload-boil-dto";

interface Resp {
  result: number;
}
@Injectable()
export class TestdbSqlService {
  constructor(@InjectConnection("trace_test_db_connection") private readonly sequelize: Sequelize) {}

  async getBatchs() {
    interface CountResp {
      count: number;
    }

    interface Resp {
      result: number;
    }

    const countQry = `
        SELECT COUNT(*) as count
        FROM Batchs
    `;
    const countResp: CountResp[] = await this.sequelize.query(countQry, {
      replacements: {
        // batchName: dto.filter.batchName,
        // startDate: dto.filter.startDate,
        // endDate: dto.filter.endDate,
        // productId: dto.filter.productId,
        // compare: dto.filter.compare ? "true" : "false",
        // plant: dto.filter.plants.length ? dto.filter.plants[0] : null,
      },
      type: sequelize.QueryTypes.SELECT,
    });
    return { total: countResp[0].count };
  }

  async execInsertXML(dto: UploadBoilDto) {
    const options = { compact: true };
    const xml = xmljs.js2xml(dto, options);
    const qry = `EXEC dbo.InsertBoilsXml2 @documentXml=:xml, @result=0; `;

    const [results, metadata] = await this.sequelize.query(qry, {
      replacements: {
        xml: xml,
        result: 0,
        type: sequelize.QueryTypes.SELECT,
      },
    });
    const normalized = Object.entries(results[0]).map(([key, value]) => ({ value }));

    return normalized[0];
  }
}
