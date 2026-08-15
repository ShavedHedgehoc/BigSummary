import Note from "./notes.model";
export declare class NotesService {
    private notesRepository;
    constructor(notesRepository: typeof Note);
    create(value: string): Promise<Note>;
    getById(id: number): Promise<Note>;
}
