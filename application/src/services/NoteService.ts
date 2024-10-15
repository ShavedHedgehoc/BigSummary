import { $api } from "../http";
import { AxiosResponse } from "axios";

export interface NoteResponse {
  id: number;
  value: string;
}

export default class NoteService {
  static getNoteById(noteId: string): Promise<AxiosResponse<NoteResponse>> {
    return $api.get(`/notes/${noteId}`);
  }
}
