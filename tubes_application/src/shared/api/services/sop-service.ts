import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface ISOPPicture {
  id: number;
  operation_id: number;
  src: string;
}

export interface ISOPPictureData {
  pictures: ISOPPicture[] | [];
}

export default class SopService {
  static async getExtrusionSopPictures(operationId: number | null): Promise<ISOPPictureData> {
    const res = await $api.get(`${ApiRoutes.GET_EXTRUSION_SOP_PICTURES}?operation_id=${operationId}`);
    return res.data;
  }

  static async getVarnishSopPictures(operationId: number | null): Promise<ISOPPictureData> {
    const res = await $api.get(`${ApiRoutes.GET_VARNISH_SOP_PICTURES}?operation_id=${operationId}`);
    return res.data;
  }

  static async getOffsetSopPictures(operationId: number | null): Promise<ISOPPictureData> {
    const res = await $api.get(`${ApiRoutes.GET_OFFSET_SOP_PICTURES}?operation_id=${operationId}`);
    return res.data;
  }

  static async getSealantSopPictures(operationId: number | null): Promise<ISOPPictureData> {
    const res = await $api.get(`${ApiRoutes.GET_SEALANT_SOP_PICTURES}?operation_id=${operationId}`);
    return res.data;
  }
}
