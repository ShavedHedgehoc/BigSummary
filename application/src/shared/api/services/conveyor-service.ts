import { $api } from "../http";

export default class ConveyorService {
  //   static async getConveyorsListWithParams(dto: FetchBoilsDto): Promise<IBoilData> {
  static async getConveyorsList(): Promise<IConveyor[]> {
    const res = await $api.get(`/conveyors`);
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
