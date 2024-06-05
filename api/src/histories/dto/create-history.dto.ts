import { ApiProperty } from "@nestjs/swagger";
//Удалить

export class CreateHistoryDto {
  @ApiProperty({ example: "1", description: "id записи сводки" })
  readonly recordId: number;
  @ApiProperty({ example: "base_check", description: "Тип записи" })
  readonly historyType: string;
  @ApiProperty({ example: "1", description: "id пользователя" })
  readonly userId: number;
  @ApiProperty({ example: "1", description: "id пользователя рабочей станции" })
  readonly employeeId: number;
  @ApiProperty({ example: "Комментарий к записи", description: "Комментарий к записи" })
  readonly note: string;
}
