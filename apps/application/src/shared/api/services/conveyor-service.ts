import { FetchConveyorFilter } from "../../../modules/conveyors/store/use-conveyors-filter-store";
import { $api } from "../http";

export interface FetchConveyorsDto {
  filter: FetchConveyorFilter;
  page: number;
  limit: number;
}

interface IConveyorData {
  rows: IConveyor[];
  total: number;
}

export default class ConveyorService {
  //   static async getConveyorsListWithParams(dto: FetchBoilsDto): Promise<IBoilData> {
  static async getConveyorsList(dto: FetchConveyorsDto): Promise<IConveyorData> {
    // const res = await $api.get(`/conveyors`);
    const res = await $api.post(`/conveyors`, dto);
    return res.data;
  }
  static async updateConveyor(dto: IConveyorUpdateDto) {
    const res = await $api.put(`/conveyors`, dto);
    return res.data;
  }

  static async deleteConveyor(id: number) {
    return $api.delete(`/conveyors/${id}`);
  }
}
