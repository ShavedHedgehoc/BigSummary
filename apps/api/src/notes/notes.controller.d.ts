import { NotesService } from "./notes.service";
import Note from "./notes.model";
export declare class NotesController {
    private notesService;
    constructor(notesService: NotesService);
    getById(id: string): Promise<Note>;
}
