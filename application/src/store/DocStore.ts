import { makeAutoObservable } from "mobx";
import SummaryService from "../services/SummaryService";
import handleError from "../http/handleError";
import { IDoc } from "../types";

export default class DocStore {
  docs = {} as IDoc[];
  pending = false;
  error = {} as string[];
  doc = {} as IDoc | null;

  constructor() {
    makeAutoObservable(this);
  }

  setDocs(docs: IDoc[] | []) {
    this.docs = [...docs];
  }

  setDoc(doc: IDoc | null) {
    this.doc = doc;
  }

  setPending(bool: boolean) {
    this.pending = bool;
  }

  setError(error: string[]) {
    this.error = error;
  }

  async fetchDocs() {
    try {
      this.setPending(true);
      this.setError([]);
      this.setDocs([]);

      const response = await SummaryService.getDocs();
      this.setDocs([...response.data]);
    } catch (error) {
      const errValue = handleError(error);
      this.setError([...errValue]);
    } finally {
      this.setPending(false);
    }
  }

  async fetchDocByid(id: string) {
    if (id) {
      try {
        this.setPending(true);
        this.setError([]);
        this.setDoc(null);

        const response = await SummaryService.getDocsById(id);
        this.setDoc(response.data);
      } catch (error) {
        console.log(error);
        const errValue = handleError(error);
        this.setError([...errValue]);
      } finally {
        this.setPending(false);
      }
    }
  }
}
