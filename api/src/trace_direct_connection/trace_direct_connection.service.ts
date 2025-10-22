import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/sequelize";
import sequelize, { Sequelize } from "sequelize";
import * as xmljs from "xml-js";
import { UploadBoilDto } from "./dto/upload-boil-dto";

@Injectable()
export class TraceDirectConnectionService {
  constructor(@InjectConnection("trace_connection") private readonly sequelize: Sequelize) {}

  async execInsertXML(dto: UploadBoilDto) {
    const options = { compact: true };
    const xml = xmljs.js2xml(dto, options);
    const qry = `EXEC dbo.InsertBoilsXml3 @documentXml=:xml, @result=0; `;
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
