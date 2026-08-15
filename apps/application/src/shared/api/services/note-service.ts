import { $api } from "../http";

export interface NoteResponse {
  id: number;
  value: string;
}

export default class NoteService {
  static async getNoteById(noteId: number): Promise<NoteResponse> {
    const res = await $api.get(`/notes/${noteId}`);
    return res.data;
  }
}
