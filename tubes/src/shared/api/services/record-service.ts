import axios from "axios";

export interface ActiveRecord {
  id: number;
  product_id: string;
  product_name: string;
  boil_value: string;
  start_date: Date;
}

export interface SetActiveRecordDto {
  record_id: number;
  conveyor_name: string;
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

  static async setActiveRecord(dto: SetActiveRecordDto): Promise<any> {
    const res = await axios({
      method: "post",
      url: `/api/tube-records/set_active`,
      data: dto,
    });
    return res.data;
  }

  static async getActiveRecord(conveyorName: string | null): Promise<ActiveRecord> {
    const res = await axios.get(`/api/tube-records/get_active/${conveyorName}`);
    return res.data;
  }
}
