
import { $api } from "../http";

export default class DocumentService {
  static async getDocumentsListWithParams(dto: FetchDocumentsDto): Promise<IDocumentData> {
    const res = await $api.post(`/docs/get_all`, dto);
    return res.data;
  }
  static async deleteDocument(document_id: number): Promise<any> {
    const res = await $api.delete(`/docs/${document_id}`);
    return res.data;
  }

  static async getDocumentById(document_id: string | undefined): Promise<IDocument> {
    const res = await $api.get(`/docs/${document_id}`);
    return res.data;
  }
}
