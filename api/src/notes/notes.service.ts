import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import Note from "./notes.model";

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note)
    private notesRepository: typeof Note
  ) {}

  async create(value: string) {
    console.log(value);
    if (!value || value === "") {
      return null;
    }
    const note = await this.notesRepository.create({ value: value });
    return note;
  }
}
