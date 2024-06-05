import { ApiProperty } from "@nestjs/swagger";

export class AddHistoriesDto {
  @ApiProperty({ example: "123B4", description: "Номер варки" })
  readonly boil: string;
  @ApiProperty({ example: "064290", description: "Код продукта" })
  readonly code: string | null;
  @ApiProperty({ example: "base_check", description: "Тип записи" })
  readonly historyType: string;
  @ApiProperty({ example: "1", description: "id пользователя" })
  readonly userId: number;
  @ApiProperty({ example: "1", description: "id пользователя рабочей станции" })
  readonly employeeId: number;
  @ApiProperty({ example: "Комментарий к записи", description: "Комментарий к записи" })
  readonly note: string;
}
