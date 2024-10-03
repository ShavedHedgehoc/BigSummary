import { Injectable } from "@nestjs/common";
import { DocsService } from "src/docs/docs.service";
import { HistoriesService } from "src/histories/histories.service";
import { RecordsService } from "src/records/records.service";

@Injectable()
export class DocsListService {
  constructor(
    private docsService: DocsService,
    private recordsService: RecordsService,
    private historiesService: HistoriesService
  ) {}

  async getDocsList() {
    const docs = this.docsService.getAllDocs();
    const docsResult = await Promise.all(
      (await docs).map(async (item) => {
        const records = await this.recordsService.getRecordsByDocId(item.id);
        const recordsCount = records.length;
        const historiesCounts = await Promise.all(
          await records.map(async (item) => {
            const count = await this.historiesService.getHistoriesCountByRecId(item.id);
            return count;
          })
        );
        const historiesCount = historiesCounts.reduce((a, b) => a + b, 0);
        return {
          id: item.id,
          date: item.date,
          plant: item.plants.value,
          recordsCount: recordsCount,
          historiesCount: historiesCount,
        };
      })
    );
    return docsResult;
  }
}
