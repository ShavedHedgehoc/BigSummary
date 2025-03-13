import axios from "axios";

export interface ActiveRecord {
  id: number;
  product_id: string;
  product_name: string;
  boil_value: string;
  start_date: Date;
}

export default class RecordService {
  static async getActiveRecordsByConveyorName(conveyorName: string | null): Promise<ActiveRecord[]> {
    const res = await axios({
      method: "post",
      url: `/api/tube-records/active`,
      headers: {},
      data: {
        conveyor_name: conveyorName,
      },
    });
    return res.data;
  }
}
