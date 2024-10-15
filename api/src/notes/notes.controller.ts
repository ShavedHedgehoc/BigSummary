import { Controller, Get, Param } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import Note from "./notes.model";

@Controller("notes")
export class NotesController {
  constructor(private notesService: NotesService) {}

  @ApiOperation({ summary: "Получить комментарий по id" })
  @ApiResponse({ status: 200, type: [Note] })
  @Get("/:id")
  getById(@Param("id") id: string) {
    return this.notesService.getById(Number(id));
  }
}
