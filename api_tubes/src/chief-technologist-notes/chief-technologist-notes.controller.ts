import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ChiefTechnologistNotesService } from "./chief-technologist-notes.service";

@ApiTags("Примечания главного технолога")
@Controller("chief-technologist-notes")
export class ChiefTechnologistNotesController {
  constructor(private readonly chiefTechnologistNotesService: ChiefTechnologistNotesService) {}

  @Get("/by_summary_id/:summary_id")
  GetEmployeeByBarcode(@Param("summary_id") summary_id: string) {
    return this.chiefTechnologistNotesService.getNoteBySummaryId(Number(summary_id));
  }
}
