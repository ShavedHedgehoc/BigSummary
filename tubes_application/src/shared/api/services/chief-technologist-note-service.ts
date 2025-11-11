import { $api } from "../http";
import { ApiRoutes } from "./api-routes";

export interface INote {
  id: number;
  summary_id: number;
  name: string;
  note: string;
}

export default class ChiefTechnologistNoteService {
  static async getNoteBySummaryId(summary_id: number | null): Promise<INote> {
    const res = await $api.get(`${ApiRoutes.GET_CHIEF_TECHNOLOGIST_NOTE}/${summary_id}`);
    return res.data;
  }
}
