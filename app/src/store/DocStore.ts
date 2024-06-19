import { makeAutoObservable } from "mobx";
import SummaryService, { IDoc } from "../services/SummaryService";
import handleError from "../http/handleError";

export default class DocStore {
    docs = {} as IDoc[];
    pending = false;
    error = {} as string[];

    constructor() {
        makeAutoObservable(this)
    }

    setDocs(docs: IDoc[] | []) {
        this.docs = [...docs];
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

            const response = await SummaryService.getDocs()
            this.setDocs([...response.data]);

        } catch (error) {
            const errValue = handleError(error);
            this.setError([...errValue]);
        } finally {
            this.setPending(false);
        }
    }
}