import { makeAutoObservable } from "mobx";

import handleError from "../shared/api/http/handleError";
import NoteService from "../services/NoteService";

export default class NoteStore {
  note = "";
  pending = false;
  error = {} as string[];

  constructor() {
    makeAutoObservable(this, {});
  }

  setNote(note: string) {
    this.note = note;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchNoteById(id: number) {
    try {
      this.setPending(true);
      this.setError([]);
      this.setNote("");
      const response = await NoteService.getNoteById(id.toString());
      this.setNote(response.data.value);
    } catch (error) {
      const errValue = handleError(error);

      if (typeof errValue === "object") {
        this.setError([...errValue]);
      } else {
        this.setError([errValue]);
      }
    } finally {
      this.setPending(false);
    }
  }
}
