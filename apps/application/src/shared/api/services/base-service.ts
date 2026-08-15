import { $api } from "../http";

//

export default class BaseService {
  static async bulkUpdateBases(dto: BulkUpdateBasesDto): Promise<any> {
    const res = await $api.post(`/bases/bulkupdate`, dto);
    return res.data;
  }
}
