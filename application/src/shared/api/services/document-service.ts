import { $api } from "../http";

export default class DocumentService {
  static async getDocumentsListWithParams(dto: FetchDocumentsDto): Promise<IDocumentData> {
    const res = await $api.post(`/docs_list`, dto);
    return res.data;
  }
  static async deleteDocuments(document_id: number): Promise<any> {
    const res = await $api.delete(`/docs/${document_id}`);
    return res.data;
  }
}
